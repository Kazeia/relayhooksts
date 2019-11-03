import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { Comp1Query } from '../../../__generated__/Comp1Query.graphql'

export default function () {
  const data = useLazyLoadQuery<Comp1Query>(
    graphql`
      query Comp1Query {
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