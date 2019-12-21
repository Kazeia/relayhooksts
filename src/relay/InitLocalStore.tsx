import React from 'react'
import { graphql, useRelayEnvironment } from 'react-relay/hooks'
import { getRequest, createOperationDescriptor } from "relay-runtime";

export default function () {
  const
    query = graphql`
      query InitLocalStoreQuery {
          __typename
          localUser {
            id
            firstName
            lastName
          }
        }
    `,
    queryRequest = getRequest(query),
    queryDescriptor = createOperationDescriptor(queryRequest, {});

  // @ts-ignore
  useRelayEnvironment().retain(queryDescriptor)

  return <></>
}