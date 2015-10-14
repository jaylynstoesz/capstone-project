Todo = React.createClass({
  destroyTodo() {
    Meteor.call("destroyTodo", this.props.todo._id)
  },

  render() {
    var todo = this.props.todo
    return (
        <div className="todo col-8">
          <span onClick={this.destroyTodo} className="fa fa-remove"></span>
          <p>{todo.text}</p>
          <p><b>{todo.deadline ? "Due: " + todo.deadline : null}</b></p>
        </div>
    )
  }
})
