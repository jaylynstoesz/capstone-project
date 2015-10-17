Todo = React.createClass({
  getInitialState() {
    return {
      editing: false
    }
  },

  destroyTodo() {
    Meteor.call("destroyTodo", this.props.todo._id)
  },

  toggleForm() {
    this.setState({editing : !this.state.editing})
  },

  renderTodo() {
    return (
      <div className="col-8 panel-small">
        <div className="col-10">
          <span className="fa fa-remove" onClick={this.destroyTodo}></span>
          <span className="fa fa-pencil" onClick={this.toggleForm}></span>
        </div>
        <div className="col-10">
          <p>{this.props.todo.text}</p>
          <p>
            <b>{this.props.todo.deadline ? "Due: " + this.props.todo.deadline : null}</b>
          </p>
        </div>
      </div>
    )
  },

  render() {
    var todo = this.props.todo
    return (
        <div>
          {this.state.editing ? <TodoForm
                                  todo={this.props.todo}
                                  toggleForm={this.toggleForm}
                                  type="update" />
                              : this.renderTodo() }
        </div>
    )
  }
})
