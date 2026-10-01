import PropTypes from 'prop-types'
import Icon from 'react-fontawesome'
import { Button } from 'react-bootstrap'

function ListItemButton({ type, title, item, onClick, doConfirm, confirmMessage }) {
  const handleClick = (e) => {
    if (doConfirm) {
      const message = confirmMessage || `${title}.`
      if (window.confirm(`${message} Are you sure?`)) {
        onClick(e, item)
      }
    } else {
      onClick(e, item)
    }
  }

  return (
    <Button bsStyle="link" title={title} onClick={handleClick}>
      <Icon name={type} />
    </Button>
  )
}

ListItemButton.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string,
  item: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  doConfirm: PropTypes.bool,
  confirmMessage: PropTypes.string,
}

ListItemButton.defaultProps = {
  title: undefined,
  item: undefined,
  doConfirm: false,
  confirmMessage: undefined,
}

export default ListItemButton
