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
        <TodoForm type="create"/>
      </div>
    )
  },

  toggleDash() {
    $("#dashboard").toggleClass("dashboard-open")
  },

  render() {
    return (
      <div>
        <div className="col-2 dashboard-component">
          <div className="col-2 container dashboard" id="dashboard">
            <div onClick={this.toggleDash}>
              <h1 className="fa fa-bars"></h1>
            </div>
            <div id="todos-list">
              {this.renderTodoForm()}
              {this.renderTodos()}
            </div>
          </div>
        </div>
      </div>
    )
  }
})
