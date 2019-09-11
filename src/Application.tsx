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
      <span className="cmd" onClick={ () => props.deleteTodo(props.todo)} >[x]</span>
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
        deleteTodo={props.deleteTodo}
      />
    )
  });
  return (
    <ul>
      { props.todos.length ? todos : <li>Nothing to do!</li> }
    </ul>
  )
}

class Application extends React.Component<HelloProps, {}> {
  private state: any;
  private setState: any;
  constructor() {
    super ();
    this.state = {
      todos: todos,
    }
    this.checkTodo = this.checkTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }
  deleteTodo(todo){
    // if (!confirm('are you sure ?')) return;

    const todos = this.state.todos.slice();
    const pos = this.state.todos.indexOf(todo);

    todos.splice(pos, 1);
    this.setState({
      todos: todos
    });
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
      <div className="container">
        <h1>My Todos </h1>
        <TodoList
          todos={ this.state.todos }
          checkTodo={ this.checkTodo }
          deleteTodo={ this.deleteTodo }
         />

      </div>
    )
  }
}

export default Application;