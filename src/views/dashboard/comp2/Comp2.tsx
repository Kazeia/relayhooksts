import React from 'react'
import { graphql, useLazyLoadQuery, useRelayEnvironment } from 'react-relay/hooks'
import { commitLocalUpdate } from "relay-runtime";
import { Comp2Query } from '../../../__generated__/Comp2Query.graphql'
// const {useRelayEnvironment} = require('react-relay/hooks');

export default function () {
  const data = useLazyLoadQuery<Comp2Query>(
    graphql`
      query Comp2Query {
        __typename
        localUser {
          id
        }
      }
    `,
    {},
    // { fetchPolicy: 'store-or-network' },
  );
  commitLocalUpdate(useRelayEnvironment(), store => {
    // record.setValue(!settings.isDrawerOpen, "isDrawerOpen");
  });
  return <div>
    {console.log(data)}
    {/* {data.localUser
      ? data.localUser.id
      : "empty"
    } */}
  </div>
}