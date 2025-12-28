import PropTypes from 'prop-types'

function FormatCurrency({ value }) {
  return (
    <span className="format-currency">
      {value &&
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value)}
    </span>
  )
}

FormatCurrency.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

FormatCurrency.defaultProps = {
  value: undefined,
}

export default FormatCurrency
