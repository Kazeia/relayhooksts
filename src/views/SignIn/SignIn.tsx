import React, { useState, useEffect } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { useHistory } from 'react-router-dom'
// @ts-ignore // TODO: until now @types/react-relay doesn't expose usemutation hook
import useMutation from 'react-relay/lib/relay-experimental/useMutation'

import { SignInQuery } from '../../__generated__/SignInQuery.graphql'
import {
  SignIn_Mutation,
} from '../../__generated__/SignIn_Mutation.graphql'

export default function () {
  const
    routerHistory = useHistory(),
    data = useLazyLoadQuery<SignInQuery>(
      graphql`
        query SignInQuery {
          localUser {
            id
            firstName
            lastName
          }
          isLoggedIn
        }
    `,
      {}
    ),
    [commitFn, isMutationInFlight] = useMutation<SignIn_Mutation>(
      graphql`
        mutation SignIn_Mutation($input: LoginPersonInput!) {
            loginPerson(input: $input) {
                clientMutationId
                personResolver {
                    id
                    firstName
                    lastName
                }
            }
        }
      `
    ),
    [email, setEmail] = useState<string>(''),
    [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (data.isLoggedIn) _successLogin()
  }, [])

  function _handleSubmit() {
    commitFn({
      variables: {
        input: {
          email,
          password,
          // WARNING: this is not needed any more: https://github.com/facebook/relay/commit/3838691f4f815ce90b6d544fa052b112259a4c9a
          clientMutationId: 'fake1',
        }
      },
      onCompleted: () => _successLogin(),
      onError: (err: string) => console.error(err)
    })
  }

  function _successLogin() {
    routerHistory.goBack()
  }

  return <div>
    <h1>Login:</h1>
    Email:
    <input
      type="text"
      id="email"
      name="email"
      value={email}
      onChange={e => setEmail(e.target.value)}
    />
    <br />
    password:
    <input
      type="password"
      id="password"
      name="password"
      value={password}
      onChange={e => setPassword(e.target.value)}
    />
    <br />
    {isMutationInFlight
      ? <h3>Sending...</h3>
      : <button onClick={_handleSubmit} >
        Sign In
      </button>
    }
  </div>
}