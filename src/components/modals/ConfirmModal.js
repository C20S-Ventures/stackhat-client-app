import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'

function ConfirmModal({ show, title, message, onConfirm, onHide }) {
  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{title || 'Confirm Action'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message || 'Are you sure?'}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Cancel</Button>
        <Button bsStyle="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

ConfirmModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.node,
  onConfirm: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
}

ConfirmModal.defaultProps = {
  title: 'Confirm Action',
  message: 'Are you sure?',
}

export default ConfirmModal
