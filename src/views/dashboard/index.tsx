import React from 'react'
import { Link } from 'react-router-dom'

import CreateQueryRendererSuspense from '../../components/relayHooks/CreateQueryRendererSuspense'
import Comp1 from './comp1'
import Comp2 from './comp2'

export default function () {

  return <div>
    <h1>LAYOUT1</h1>
    <Link to="/teachers">teachers</Link>
    <CreateQueryRendererSuspense>
      <Comp1 />
    </CreateQueryRendererSuspense>
    <hr />
    <hr />
    <CreateQueryRendererSuspense>
      <Comp2 />
    </CreateQueryRendererSuspense>
  </div>
}