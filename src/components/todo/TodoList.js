import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = props => (
  <div className="Todo-list">
    <ul>
      {
        props.todos.map(todo =>
          <TodoItem key={todo.id}{...todo} />,
        )
      }
    </ul>
  </div>
);

TodoList.propTypes = {
  todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};
