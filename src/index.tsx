import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { RelayEnvironmentProvider } from 'react-relay/hooks'
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import CreateQueryRendererSuspense from './components/relayHooks/CreateQueryRendererSuspense'

function fetchQuery(
  operation: any,
  variables: any,
) {
  return fetch('http://localhost:8080/query', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});


ReactDOM.render(
  <RelayEnvironmentProvider environment={modernEnvironment}>
    <CreateQueryRendererSuspense>
      <App />
    </CreateQueryRendererSuspense>
  </RelayEnvironmentProvider>,
  document.getElementById('root')
);


// https://github.com/relay-tools/relay-hooks
// https://relay.dev/docs/en/api-reference#relayenvironmentprovider