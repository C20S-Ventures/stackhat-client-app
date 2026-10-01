import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { sortBy } from 'lodash'
import { InlineTagsInput } from './'
import FormatForCode from '../formatting/FormatForCode'

function InlineSeoInput(props) {
  return (
    <InlineTagsInput
      icon="project-diagram"
      value={sortBy(props.items, (o) => o.Classification.Name)}
      editConfig={
        props.editable
          ? {
              apiSet: 'SEOs',
              idKey: 'ClassificationID',
              searchKey: 'Code_Name',
              labelKey: (item) => `${item.Code} - ${item.Name}`,
              selectedLabelResolver: (item) =>
                `${FormatForCode.TrimCode(item.Code)} - ${item.Name}`,
              onAddTag: (adding) => {
                return props.store.AddSeo(props.id, adding.ClassificationID)
              },
              onRemoveTag: (removing) => {
                props.store.RemoveSeo(removing[props.linkIdName])
              },
            }
          : null
      }
      textResolver={(tag) => tag.Classification.Name}
      titleResolver={(tag) => `SEO: ${tag.Classification.Code}`}
      idKey={props.linkIdName}
      change={() => {}}
      propName="NA"
      emptyText={`No SEOs defined.${props.editable ? ' Click to edit.' : ''}`}
    />
  )
}

InlineSeoInput.propTypes = {
  items: PropTypes.array,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  editable: PropTypes.bool,
  linkIdName: PropTypes.string.isRequired,
  store: PropTypes.shape({
    AddSeo: PropTypes.func.isRequired,
    RemoveSeo: PropTypes.func.isRequired,
  }),
}

InlineSeoInput.defaultProps = {
  items: [],
  editable: false,
}

export default observer(InlineSeoInput)
