Dashboard = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      allTodos: Todos.find({owner: Meteor.userId()}, {sort: {createdAt : -1}}).fetch(),
    }
  },

  getInitialState() {
    return {
      viewing: false
    }
  },

  allFields() {
    return [
      "text",
      "deadline",
    ]
  },

  handleSubmit(event) {
    event.preventDefault()
    var todoObject = {}
    var allFields = this.allFields()
    for (var i = 0; i < allFields.length; i++) {
      var DOMNode = React.findDOMNode(this.refs[allFields[i]]).value.trim()
      todoObject[allFields[i]] = DOMNode
    }
    todoObject.private = false
    Meteor.call("createTodo", todoObject)
    React.findDOMNode(this.refs.text).value = ""
    React.findDOMNode(this.refs.deadline).value = ""
  },



  renderTodos() {
    var allTodos = this.data.allTodos
    return allTodos.map((todo) => {
      return (
        <Todo key={todo._id} todo={todo} />
      )
    })
  },

  renderTodoForm() {
    return (
      <div className="col-9" id="todos">
        <form onSubmit={this.handleSubmit}>
          <input className="col-10" ref="text" type="text" placeholder="Add a new to-do"></input>
          <label htmlFor="deadline">Choose a deadline (optional)</label>
          <input className="col-7" ref="deadline" type="date" name="deadline"></input>
          <input className="col-1" type="submit" className="button button-small" value="+"></input>
        </form>
      </div>
    )
  },

  render() {
    return (
      <div>
        <div className="col-2 dashboard-component">
          <div className="col-2 container dashboard" id="dash">
            {this.renderTodoForm()}
            {this.renderTodos()}
          </div>
        </div>
      </div>
    )
  }
})
