import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { Link } from 'react-router-dom'

import { ContinentsWithPagination } from './components';
import { ContinentsQuery } from '../../__generated__/ContinentsQuery.graphql'

export default function () {
  const
    data = useLazyLoadQuery<ContinentsQuery>(
      graphql`
        query ContinentsQuery {
          viewer {
            ...ContinentsWithPagination_viewer
          }
        }
      `,
      {}
    );

  return <>
    <Link to="/">GO BACK</Link>
    <hr />
    <ContinentsWithPagination viewer={data.viewer} />
  </>
}