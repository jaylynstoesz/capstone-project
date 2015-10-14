Todo = React.createClass({
  destroyTodo() {
    Meteor.call("destroyTodo", this.props.todo._id)
  },

  render() {
    var todo = this.props.todo
    return (
      <div>
        <p>{todo.text}</p>
        <p><b>{todo.deadline ? todo.deadline : null}</b></p>
        <button onClick={this.destroyTodo}>X</button>
      </div>
    )
  }
})
