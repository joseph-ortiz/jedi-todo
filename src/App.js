import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [
        { id: 1, name: 'Buy Lightsaber', isComplete: true },
        { id: 2, name: 'Use ForcePower', isComplete: false },
        { id: 3, name: 'Delete Jar Jar Binks', isComplete: false },
      ],
    };
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Jedi Todo List</h2>
        </div>
        <div className="Todo-app">
          <form>
            <input type="text" />
            <div className="Todo-list">
              <ul>
                {
                  this.state.todos.map(todo =>
                    <li key={todo.id}>
                      <input type="checkbox" defaultChecked={todo.isComplete}/> { todo.name }
                    </li>)
                }
              </ul>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
