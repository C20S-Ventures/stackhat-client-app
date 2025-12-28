import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'
import ModalFormField from './ModalFormField'

function EditorModal({ form, onHide }) {
  const renderFields = () => {
    const fields = []
    form.fields.forEach((field) => fields.push(field))
    return fields.map((field, index) => <ModalFormField key={index} field={field} />)
  }

  return (
    <form>
      <Modal show={true} onHide={onHide}>
        <Modal.Header>
          <Modal.Title>{form.Title || 'Editor'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderFields()}</Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Cancel</Button>
          <Button bsStyle="primary" onClick={form.onSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  )
}

EditorModal.propTypes = {
  form: PropTypes.shape({
    Title: PropTypes.string,
    fields: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
  onHide: PropTypes.func.isRequired,
}

export default EditorModal
