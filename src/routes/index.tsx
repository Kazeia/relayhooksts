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
      <RouteWithSuspense exact path='/' Component={Home} />
      <RouteWithSuspense exact path='/signIn' Component={SignIn} />
      <RouteWithSuspense exact path='/continents' Component={Continents} />
    </Switch>
  </BrowserRouter>
}