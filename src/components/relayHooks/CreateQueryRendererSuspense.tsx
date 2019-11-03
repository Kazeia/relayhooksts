import React from 'react'
import ErrorBoundaryWithRetry from './ErrorBoundaryWithRetry'

interface Props {
  children: React.ReactNode
}

export default function (props: Props) {
  return <ErrorBoundaryWithRetry fallback={(error: string | null, retry: () => void) =>
    <>
      {/* this shows the error message */}
      {console.error(error)}
      <button onClick={retry}>Retry</button>
    </>
  }>
    <React.Suspense fallback={<h3>Loading...</h3>}>
      {props.children}
    </React.Suspense>
  </ErrorBoundaryWithRetry >
};