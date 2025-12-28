import { Component } from 'react'
import PropTypes from 'prop-types'
import { ErrorContent } from '.'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    this.setState({ info })

    // Log error to console in development only
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ErrorBoundary]', error, info)
    }

    // TODO: Log UI error to error tracking service (e.g., Sentry)
    // ErrorTrackingService.captureException(error, { extra: info })
  }

  render() {
    const { hasError, error, info } = this.state

    if (hasError) {
      return <ErrorContent detail={{ error, info }} />
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ErrorBoundary
