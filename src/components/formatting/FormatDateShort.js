import PropTypes from 'prop-types'

function FormatDateShort({ value }) {
  try {
    return (
      <span className="format-date">
        {value &&
          new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          }).format(value)}
      </span>
    )
  } catch (ex) {
    return <span>Data invalid.</span>
  }
}

FormatDateShort.propTypes = {
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string, PropTypes.number]),
}

FormatDateShort.defaultProps = {
  value: undefined,
}

export default FormatDateShort
