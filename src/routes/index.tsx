import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import {
  SignIn
} from '../views'
import CreateQueryRendererSuspense from '../components/relayHooks/CreateQueryRendererSuspense'

export default function () {
  return <BrowserRouter>
    <Switch>
      <Route exact path='/' component={() => <h1>david</h1>} />
      <Route exact path='/signIn' component={
        () => <CreateQueryRendererSuspense>
          <SignIn />
        </CreateQueryRendererSuspense>
      } />
    </Switch>
  </BrowserRouter>
}