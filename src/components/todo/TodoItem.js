import React from 'react';
import { partial } from '../../lib/utils';

export const TodoItem = (props) => {
  const handleToggle = partial(props.handleToggle, props.id);
  return (
    <li key={props.id}>
      <input
        type="checkbox"
        onChange={handleToggle}
        checked={props.isComplete}
      /> { props.name }
    </li>
  );
};

TodoItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool,
  id: React.PropTypes.number.isRequired,
  handleToggle: React.PropTypes.func,
};

TodoItem.defaultProps = {
  isComplete: false,
  handleToggle: () => { console.log('default handleToggle'); },
};
