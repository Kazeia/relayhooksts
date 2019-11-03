import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { Comp2Query } from '../../../__generated__/Comp2Query.graphql'

export default function () {
  const data = useLazyLoadQuery<Comp2Query>(
    graphql`
      query Comp2Query {
        isLoggedIn
      }
    `,
    {},
    { fetchPolicy: 'store-or-network' },
  );

  return <div>
    {data.isLoggedIn
      ? <h1>logeao</h1>
      : <h1>no logeao</h1>
    }
  </div>
}