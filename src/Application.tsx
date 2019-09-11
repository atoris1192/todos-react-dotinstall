import * as React from 'react';
export interface HelloProps { name: string; }

interface Todos {
  id: number;
  title: string;
  isDone: boolean
}

const todos:Todos[]  = [
  {id: 0, title: "Task 0", isDone: false},
  {id: 1, title: "Task 1", isDone: false},
  {id: 2, title: "Task 2", isDone: true},
]
function TodoItem(props) {
  return (
    <li key={props.todo.id}>
      <label>
        <input type="checkbox"
          checked={props.todo.isDone}
          onChange={() => props.checkTodo(props.todo)}
        /> 
        <span className={ props.todo.isDone ? 'done' : ''}>
          { props.todo.title }
        </span>
      </label>
    </li>
  )
}

function TodoList(props) {
  const todos = props.todos.map(todo => {
    return (
      <TodoItem 
        key={todo.id} 
        todo={todo}
        checkTodo={props.checkTodo}
      />
    )
  });
  return (
    <ul>
      { todos }
    </ul>
  )
}

class Application extends React.Component<HelloProps, {}> {
  private state: any;
  constructor() {
    super ();
    this.state = {
      todos: todos,
    }
    this.checkTodo = this.checkTodo.bind(this);
  }
  checkTodo(todo) {
    const todos = this.state.todos.map(todo => {
      return { // copy
        id: todo.id,
        title: todo.title,
        isDone: todo.isDone,
      }
    })
    const pos = this.state.todos.map(todo => {
      return todo.id;
    }).indexOf(todo.id);

    todos[pos].isDone = !todos[pos].isDone;
    this.setState({
      todos: todos
    })
  }
  render() {
    return (
      <div>
        <h1>My Todos </h1>
        <TodoList
          todos={ this.state.todos }
          checkTodo={ this.checkTodo }
         />

      </div>
    )
  }
}

export default Application;