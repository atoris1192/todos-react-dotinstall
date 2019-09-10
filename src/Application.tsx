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
    <li key={props.todo.id}>{ props.todo.title }</li>
  )

}

function TodoList(props) {
  const todos = props.todos.map(todo => {
    return (
      <TodoItem 
        key={todo.id} 
        todo={todo}
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
  }
  render() {
    return (
      <div>
        <h1>My Todos </h1>
        <TodoList todos={ this.state.todos }/>
      </div>
    )
  }
}

export default Application;