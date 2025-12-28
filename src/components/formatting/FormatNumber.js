import PropTypes from 'prop-types'

function FormatNumber({ value }) {
  return (
    <span className="format-number">
      {value &&
        new Intl.NumberFormat('en-GB', {
          style: 'decimal',
        }).format(value)}
    </span>
  )
}

FormatNumber.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

FormatNumber.defaultProps = {
  value: undefined,
}

export default FormatNumber
