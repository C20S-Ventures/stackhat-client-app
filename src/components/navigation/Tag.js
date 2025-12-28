import PropTypes from 'prop-types'
import Icon from 'react-fontawesome'

function Tag({ text, icon, title }) {
  return (
    <span className="tag" title={title}>
      <Icon name={icon} /> {text}
    </span>
  )
}

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string,
}

Tag.defaultProps = {
  title: undefined,
}

export default Tag
