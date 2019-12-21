import React from 'react'

interface Props {
  children: React.ReactChild
  fallback: any
}

interface State {
  error: string | null
}

export default class ErrorBoundaryWithRetry extends React.Component<Props, State> {
  state = { error: null };

  static getDerivedStateFromError(error: string | null): State {
    return { error };
  }

  _retry = () => {
    this.setState({ error: null });
  }

  render() {
    const { children, fallback } = this.props,
      { error } = this.state;

    if (error) {
      if (typeof fallback === 'function') return fallback(error, this._retry);
      return fallback;
    }
    return children;
  }
}
