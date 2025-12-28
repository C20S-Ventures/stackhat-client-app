import PropTypes from 'prop-types'
import Spinner from '../assets/spinner.svg'

function LoadingSpinner({ size, alt }) {
  return (
    <img
      src={Spinner}
      alt={alt}
      width={size}
      height={size}
      aria-busy="true"
    />
  )
}

LoadingSpinner.propTypes = {
  size: PropTypes.number,
  alt: PropTypes.string,
}

LoadingSpinner.defaultProps = {
  size: 32,
  alt: 'Loading...',
}

export default LoadingSpinner
