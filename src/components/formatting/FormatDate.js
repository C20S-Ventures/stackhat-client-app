import PropTypes from 'prop-types'

function FormatDate({ value }) {
  try {
    return (
      <span className="format-date">
        {value &&
          new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
          }).format(value)}
      </span>
    )
  } catch (ex) {
    return <span>Data invalid.</span>
  }
}

FormatDate.propTypes = {
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string, PropTypes.number]),
}

FormatDate.defaultProps = {
  value: undefined,
}

export default FormatDate
