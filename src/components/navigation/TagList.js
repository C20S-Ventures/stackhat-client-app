import PropTypes from 'prop-types'
import Tag from './Tag'

function TagList({ tags, textResolver, titleResolver, classNameResolver, icon }) {
  return (
    <div className="tag-list">
      <ul className="list-inline">
        {tags &&
          tags.map((tag, index) => (
            <li
              key={index}
              title={titleResolver ? titleResolver(tag) : ''}
              className={classNameResolver ? classNameResolver(tag) : ''}
            >
              <Tag
                icon={icon || 'tag'}
                text={textResolver ? textResolver(tag) : tag.Tag.Value}
              />
            </li>
          ))}
      </ul>
    </div>
  )
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object),
  textResolver: PropTypes.func,
  titleResolver: PropTypes.func,
  classNameResolver: PropTypes.func,
  icon: PropTypes.string,
}

TagList.defaultProps = {
  tags: [],
  textResolver: undefined,
  titleResolver: undefined,
  classNameResolver: undefined,
  icon: 'tag',
}

export default TagList
