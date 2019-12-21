import React, { useEffect, useState } from 'react'
import { graphql, usePaginationFragment } from 'react-relay/hooks'

import { ContinentsWithPaginationQuery } from '../../../__generated__/ContinentsWithPaginationQuery.graphql';
import { ContinentsWithPagination_viewer$key } from '../../../__generated__/ContinentsWithPagination_viewer.graphql';
import { ContinentsQueryResponse } from '../../../__generated__/ContinentsQuery.graphql';

// TODO: check if pagination load everything ... cursor issues?
export default function ({ viewer }: ContinentsQueryResponse) {
  const
    [loadingMoreItems, setLoadingMoreItems] = useState<boolean>(false),
    { data, loadNext, hasNext } = usePaginationFragment<ContinentsWithPaginationQuery, ContinentsWithPagination_viewer$key>(
      graphql`
        fragment ContinentsWithPagination_viewer on Viewer
        @argumentDefinitions(after: {type: "ID"}, first: {type: "Int"}) 
        @refetchable(queryName: "ContinentsWithPaginationQuery") {
          person {
                id
                firstName
                lastName
            }
            continentsWithPagination (
                after: $after
                first: $first
            ) @connection(key: "ContinentsWithPagination_viewer_continentsWithPagination") {
                totalCount
                edges {
                    cursor
                    node {
                        id
                        code
                        name
                    }
                }
            }
        }
      `,
      viewer
    ),
    _handleScroll = () => {
      if (!loadingMoreItems && hasNext &&
        (window.innerHeight + window.scrollY) >= document.body.offsetHeight
      )
        loadNext(
          10,
          { onComplete: () => setLoadingMoreItems(false) }
        )
    };

  useEffect(() => {
    window.addEventListener("scroll", _handleScroll);
    return () => {
      window.removeEventListener("scroll", _handleScroll);
    };
  }, [])

  return <div>
    {data.continentsWithPagination?.edges.length > 0 &&
      <div>
        <h3>
          Total Count of continents: {data.continentsWithPagination.totalCount}
        </h3>
        <div>
          {data.continentsWithPagination.edges.map(item => <div key={item?.node.id?.toString()}>
            <h1>Item</h1>
            <p>id: {item?.node.id}</p>
            <p>code: {item?.node.code}</p>
            <p>name: {item?.node.name}</p>
          </div>
          )}
        </div>
        <hr />
        {loadingMoreItems && <h1>Loading more items...</h1>}
      </div>
    }
    <hr />
    <h2>Viewer</h2>
    <p>id: {data.person.id}</p>
    <p>fistName: {data.person.firstName}</p>
    <p>lastName: {data.person.lastName}</p>
  </div>
}