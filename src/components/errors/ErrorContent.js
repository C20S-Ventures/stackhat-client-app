import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import Icon from 'react-fontawesome'
import Config from 'react-global-configuration'

const { showDetail } = Config.get("errors")

function ErrorContent({ detail }) {
  return (
    <div className="error-content" role="alert">
      <Row>
        <Col md={3} />
        <Col md={6}>
          <h1 className="h3">
            <Icon name="exclamation-triangle" aria-hidden="true" /> Client Application Error
          </h1>
          <p>An unhandled exception has occurred in the client application.</p>
          <p>Please try reloading your browser, or if the problem persists please contact application support.</p>
          {showDetail && detail?.error && detail?.info && (
            <div className="error-detail format-text">
              <h2 className="h4">Exception Detail</h2>
              <pre>
                {detail.error.toString()}
                {'\n'}
                {detail.info.componentStack}
              </pre>
            </div>
          )}
        </Col>
        <Col md={3} />
      </Row>
    </div>
  )
}

ErrorContent.propTypes = {
  detail: PropTypes.shape({
    error: PropTypes.object,
    info: PropTypes.shape({
      componentStack: PropTypes.string,
    }),
  }),
}

ErrorContent.defaultProps = {
  detail: null,
}

export default ErrorContent
