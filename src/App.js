import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoForm } from './components/todo/TodoForm';
import { TodoList } from './components/todo/TodoList';
import { addTodo, generateId, findById,
        toggleTodo, updateTodo, removeTodo } from './lib/todoHelpers';
import { pipe, partial } from './lib/utils';


class App extends Component {
  state = {
    todos: [
      { id: 1, name: 'Buy Lightsaber', isComplete: true },
      { id: 2, name: 'Use ForcePower', isComplete: false },
      { id: 3, name: 'Delete Jar Jar Binks', isComplete: false },
    ],
    currentTodo: '',
    errorMessage: '',
  };

  handleRemove = (id, evt) => {
    evt.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({ todos: updatedTodos });
  }

  handleToggle = (id) => {
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos));
    const updatedTodos = getUpdatedTodos(id, this.state.todos);
    this.setState({ todos: updatedTodos });
  }

  handleInputChange = (evt) => {
    this.setState({
      currentTodo: evt.target.value,
    });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const newId = generateId();
    const newTodo = { id: newId, name: this.state.currentTodo, isComplete: false };
    const updatedTodos = addTodo(this.state.todos, newTodo);
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
    });
  }

  handleEmptySubmit = (evt) => {
    evt.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo name',
    });
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Jedi Todo List</h2>
        </div>
        <div className="Todo-app">
          {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
          <TodoForm
            handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            handleSubmit={submitHandler}
          />
        <TodoList
          todos={this.state.todos}
          handleToggle={this.handleToggle}
          handleRemove={this.handleRemove}
        />
        </div>
      </div>
    );
  }
}

export default App;
