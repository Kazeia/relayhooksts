import RelayStore from './Store'
import { QueryResponseCache } from 'relay-runtime'
import { Environment, Network, RecordSource, Store } from "relay-runtime"
import { RequestParameters } from 'relay-runtime/lib/util/RelayConcreteNode'
import { Variables, CacheConfig } from 'relay-runtime/lib/util/RelayRuntimeTypes'

const
  cache = new QueryResponseCache({ size: 2500, ttl: 600 * 1000/* One Minute */ }),
  // TODO: how add another node_env? to be dev, staging, prod
  url = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/query'
    : 'https://api.proyecto11.com/query'

async function fetchQuery(
  operation: RequestParameters,
  variables: Variables,
  cacheConfig: CacheConfig
) {
  const
    queryID = String(operation.text),
    isMutation = operation.operationKind === 'mutation',
    isQuery = operation.operationKind === 'query',
    forceFetch = cacheConfig && cacheConfig.force,
    fromCache = cache.get(queryID, variables)

  if (isQuery && fromCache && !forceFetch) return fromCache

  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => response.json())
    // TODO: rethink it, we change to react-router...
    .then(json => {
      // Update cache on queries
      if (isQuery && json) cache.set(queryID, variables, json)

      // Clear cache on mutations
      if (isMutation) cache.clear()

      // Catch error, and send to Routes.js https://github.com/facebook/relay/issues/1816
      if (json.errors) return Promise.reject(json.errors)

      return Promise.resolve(json)
    })
    .catch(error => Promise.reject(error))
}

export default RelayStore(new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource())
}))