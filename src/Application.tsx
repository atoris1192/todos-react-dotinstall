import React from 'react';

interface Todos {
  id: number;
  title: string;
  isDone: boolean;
}

const todos: Todos[] = [
  { id: 0, title: "Task 0", isDone: false },
  { id: 1, title: "Task 1", isDone: false },
  { id: 2, title: "Task 2", isDone: true },
]

function TodoItem(props) {

  return (
    <li>
      <label htmlFor="">
        <input type="checkbox"
          checked={ props.todo.isDone } 
          onChange={ () => props.checkTodo(props.todo) }
        />
        <span className={props.todo.isDone ? 'done' : ''}>
          { props.todo.title}
        </span>
      </label>
      <span className="cmd" 
        onClick={ () => props.deleteTodo(props.todo)}
      >[x]
      </span>
    </li>
  )
}

function TodoList(props) {
  const todos = props.todos.map( todo => {
    return(
      <TodoItem
        key={todo.id}
        todo={todo}
        checkTodo={ props.checkTodo }
        deleteTodo={ props.deleteTodo }
      />
    )
  })

  return(
    <ul>
      { todos }
    </ul>
  )
}

function TodoForm(props) {

  return(
    <form onSubmit={ props.addTodo }>
      <input type="text"
        value={props.item}
        onChange={ props.updateItem }
      />
      <input type="submit" value="Add"/>
    </form>
  )
}
function getUniqueId() {
  return new Date().getTime().toString(36) + '-' + Math.random().toString(36);
}

class Application extends React.Component {
  private state: any;
  private setState: any;
  constructor() {
    super();
    this.state = {
      todos: todos,
      item: '',
    }
    this.checkTodo = this.checkTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }
  addTodo(e) {
    e.preventDefault();
    if (this.state.item.trim() === '') return

    const item = {
      id: getUniqueId(),
      title: this.state.item,
      isDone: false,
    }
    const todos = this.state.todos.slice();
    todos.push(item);
    this.setState({
      todos: todos,
      item: '',
    })

console.log('GetUniqueId: ', getUniqueId());
console.log('Item: ',this.state.item);
  }
  updateItem(e) {
    this.setState({
      item: e.target.value
    })
    
  }
  deleteTodo(props) {
    if (!confirm("Are you sure ?")) return

    const pos = this.state.todos.indexOf(props);
    const todos = this.state.todos.slice();

    todos.splice(pos, 1);
    this.setState({
      todos: todos,
    })

  }
  checkTodo(props) {
    const pos = this.state.todos.map( todo => {
      return todo.id
    }).indexOf(props.id)

    const todos = this.state.todos.slice(); // コピー

    todos[pos].isDone = !todos[pos].isDone;
    this.setState({
      todos: todos // ここの todos で 既存のtodos を上書き
    })
  }

  render() {
    return(
      <div className="container">
        <h1> My Todos </h1>
        <TodoList
          todos={this.state.todos}
          checkTodo={ this.checkTodo }
          deleteTodo={ this.deleteTodo }
        />
        <TodoForm 
          item={this.state.item}
          updateItem={ this.updateItem }
          addTodo={ this.addTodo }
        />
      </div>
    )
  }
}
export default Application;