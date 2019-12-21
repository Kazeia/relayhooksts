import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import {
  SignIn
} from '../views'
import RouteWithSuspense from '../components/suspense/RouteWithSuspense'

export default function () {
  return <BrowserRouter>
    <Switch>
      <RouteWithSuspense exact path='/' CompWithSuspense={() => <h1>david</h1>} />
      <RouteWithSuspense exact path='/signIn' CompWithSuspense={SignIn} />
    </Switch>
  </BrowserRouter>
}