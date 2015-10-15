Todo = React.createClass({
  getInitialState() {
    return {
      editing: false
    }
  },

  toggleForm() {
    this.setState({editing : !this.state.editing})
  },

  destroyTodo() {
    Meteor.call("destroyTodo", this.props.todo._id)
  },

  renderTodo() {
    return (
      <div className="todo col-8">
        <div className="col-10">
          <span onClick={this.destroyTodo} className="fa fa-remove"> </span>
          <span onClick={this.toggleForm} className="fa fa-pencil"> </span>
        </div>
        <div className="col-10">
          <p>{this.props.todo.text}</p>
          <p><b>{this.props.todo.deadline ? "Due: " + this.props.todo.deadline : null}</b></p>
        </div>
      </div>
    )
  },

  render() {
    var todo = this.props.todo
    return (
        <div>
          {this.state.editing ? <TodoForm type="update" todo={this.props.todo} toggleForm={this.toggleForm}/> : this.renderTodo() }
        </div>
    )
  }
})
