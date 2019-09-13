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
      />
    )
  })

  return(
    <ul>
      { todos }
    </ul>
  )
}
class Application extends React.Component {
  private state: any;
  private setState: any;
  constructor() {
    super();
    this.state = {
      todos: todos,
    }
    this.checkTodo = this.checkTodo.bind(this);
  }
  checkTodo(props) {
    // クリックしたnumber 0 ~ 2
    const pos = this.state.todos.map( todo => {
      return todo.id
    }).indexOf(props.id)

    const todos = this.state.todos.slice(); // コピー

    // const todos = this.state.todos.map( todo => {
    //   return {
    //     id: todo.id,
    //     title: todo.title, 
    //     isDone: todo.isDone, 
    //   }
    // })
    // console.log(todos);
    
   todos[pos].isDone = !todos[pos].isDone;
   this.setState({
     todos: todos // ここの todos で 既存のtodos を上書き
   })
  }

  render() {
    return(
      <div>
        <TodoList
          todos={this.state.todos}
          checkTodo={ this.checkTodo }
        />
      </div>
    )
  }
}
export default Application;