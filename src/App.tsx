import React from 'react'

import { AppQuery } from './__generated__/AppQuery.graphql'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'

export default function (props: any) {
  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery {
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