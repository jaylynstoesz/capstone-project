Dashboard = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      allTodos: Todos.find({owner: Meteor.userId()}, {sort: {createdAt : -1}}).fetch(),
    }
  },

  toggleDash() {
    $(".dashboard-left").toggleClass("dashboard-left-open")
  },

  renderTodos() {
    var allTodos = this.data.allTodos
    return allTodos.map((todo) => {
      return (
        <Todo key={todo._id} todo={todo} />
      )
    })
  },

  render() {
    return (
      <div className="container col-2 dashboard-left">
        <div onClick={this.toggleDash}>
          <h1 className="fa fa-bars"></h1>
        </div>
        <h3>To-Do List</h3>
        <div className="todo-list">
          <div className="col-9">
            <TodoForm type="create"/>
          </div>
          {this.renderTodos()}
        </div>
      </div>
    )
  }
})
