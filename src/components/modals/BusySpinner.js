import PropTypes from 'prop-types'
import LoadingSpinner from '../LoadingSpinner'

function BusySpinner({ style, message }) {
  return (
    <div className="modal-busy" style={style}>
      <LoadingSpinner /> {message}
    </div>
  )
}

BusySpinner.propTypes = {
  style: PropTypes.object,
  message: PropTypes.string,
}

BusySpinner.defaultProps = {
  style: undefined,
  message: undefined,
}

export default BusySpinner
