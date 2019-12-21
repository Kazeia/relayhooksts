import React from 'react';
import ReactDOM from 'react-dom';
import ModernEnvironment from './relay/Environment'
import { RelayEnvironmentProvider } from 'react-relay/hooks'

import Router from './routes'
import InitLocalStore from './relay/InitLocalStore'

ReactDOM.render(
  <RelayEnvironmentProvider environment={ModernEnvironment}>
    <InitLocalStore />
    <Router />
  </RelayEnvironmentProvider>,
  document.getElementById('root')
);

// https://github.com/sibelius/nested-rerender/blob/master/src/index.js


// https://github.com/relay-tools/relay-hooks
// https://relay.dev/docs/en/api-reference#relayenvironmentprovider
// https://relay.dev/docs/en/next/local-state-management