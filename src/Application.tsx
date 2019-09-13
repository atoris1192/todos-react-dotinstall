import React from 'react';
interface Todos{
  id: number;
  title: string;
  isDone: boolean;
}

const todos: Todos[] = [
  { id: 0, title: "Task 0", isDone: false },
  { id: 1, title: "Task 1", isDone: false },
  { id: 2, title: "Task 2", isDone: true },
]

const TodoList = (props) => {
  const todos = props.todos.map( todo => {
    return(
      <li key={ todo.id }>{ todo.title }</li>
    )
  })

  return (
    <ul>
      { todos }
    </ul>
  )
}
class Application extends React.Component {
  private state: any;
  constructor() {
    super();
    this.state = {
      todos: todos,
    }
  }

  render() {
    return (
      <div>
          <h1> My Todos </h1>
          <TodoList todos={this.state.todos}/>
          {/* <li>{ this.state.todos[0].title }</li>
          <li>{ this.state.todos[1].title }</li>
          <li>{ this.state.todos[2].title }</li> */}
      </div>
    )
  }
}

export default Application;