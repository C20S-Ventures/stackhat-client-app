import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'

function PlaceholderModal({ title, onHide }) {
  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{title || 'Editor'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Form currently unavailable.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Cancel</Button>
        <Button bsStyle="primary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

PlaceholderModal.propTypes = {
  title: PropTypes.string,
  onHide: PropTypes.func.isRequired,
}

PlaceholderModal.defaultProps = {
  title: 'Editor',
}

export default PlaceholderModal
