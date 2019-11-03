import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Dashboard from '../views/dashboard'
import Teachers from '../views/teachers'

export default function () {
  return <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Dashboard} />
      <Route exact path='/teachers' component={Teachers} />
    </Switch>
  </BrowserRouter>
}