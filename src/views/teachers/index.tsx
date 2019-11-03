import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function () {
  const history = useHistory()

  return <div>
    <h1>teachers</h1>
    <Link to="/">Home</Link>
    <br />
    <button type="button" onClick={history.goBack}>Go Back</button>
  </div>
}