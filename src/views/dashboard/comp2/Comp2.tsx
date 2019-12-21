import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { Comp2Query } from '../../../__generated__/Comp2Query.graphql'

export default function () {
  const data = useLazyLoadQuery<Comp2Query>(
    graphql`
      query Comp2Query {
        isLoggedIn
        localUser {
          id
        }
      }
    `,
    {},
  );

  return <div>
    {console.log(data)}
    {/* {data.localUser
      ? data.localUser.id
      : "empty"
    } */}
  </div>
}