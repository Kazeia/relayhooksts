import React from 'react'
import { Route, RouteProps } from 'react-router-dom'

import CreateQueryRendererSuspense from '../hooks/CreateQueryRendererSuspense'

interface IOwnProps {
  CompWithSuspense: React.ElementType;
}

type IProps = RouteProps & IOwnProps;

// TODO: implement wrapper for change title
export default function (props: IProps) {
  return <Route {...props} component={() =>
    <CreateQueryRendererSuspense>
      <props.CompWithSuspense />
    </CreateQueryRendererSuspense>
  } />
}