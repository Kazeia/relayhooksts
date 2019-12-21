import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import RouteWithSuspense from '../components/suspense/RouteWithSuspense'
import {
  SignIn,
  Home,
  Continents,
} from '../views'

export default function () {
  return <BrowserRouter>
    <Switch>
      <RouteWithSuspense exact path='/' CompWithSuspense={Home} />
      <RouteWithSuspense exact path='/signIn' CompWithSuspense={SignIn} />
      <RouteWithSuspense exact path='/continents' CompWithSuspense={Continents} />
    </Switch>
  </BrowserRouter>
}