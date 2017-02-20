import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoForm } from './components/todo/TodoForm';
import { TodoList } from './components/todo/TodoList';
import { Footer } from './components/todo/Footer';
import { addTodo, generateId, findById,
        toggleTodo, updateTodo, removeTodo,
        filterTodos } from './lib/todoHelpers';
import { pipe, partial } from './lib/utils';
import { loadTodos, createTodo } from './lib/todoService';


class App extends Component {
  state = {
    todos: [],
    currentTodo: '',
    errorMessage: '',
  };

  static contextTypes = {
    route: React.PropTypes.string,
  }

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos}));
  }

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
    createTodo(newTodo)
      .then(() => this.showTempMessage('Todo added'));
  }

  showTempMessage = (msg) => {
    this.setState({ message: msg});
    setTimeout(() => this.setState({ message: '' }), 2500);
  }

  handleEmptySubmit = (evt) => {
    evt.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo name',
    });
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    const displayTodos = filterTodos(this.state.todos, this.context.route);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Jedi Todo List</h2>
        </div>
        <div className="Todo-app">
          {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
          {this.state.message && <span className="success">{this.state.message}</span>}
          <TodoForm
            handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            handleSubmit={submitHandler}
          />
          <TodoList
            todos={displayTodos}
            handleToggle={this.handleToggle}
            handleRemove={this.handleRemove}
          />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
