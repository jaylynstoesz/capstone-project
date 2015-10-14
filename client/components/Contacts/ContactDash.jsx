ContactDash = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    var contactList = this.props.currentUser.contacts || []
    return {
      allUContacts: Meteor.users.find({_id: {$in: contactList }}, {sort: {firstName: 1}}).fetch()
    }
  },

  getInitialState() {
    return {
      viewing: false
    }
  },

  // renderTodos() {
  //   var allContacts = this.data.allContacts
  //   return allContacts.map((todo) => {
  //     return (
  //       <Todo key={todo._id} todo={todo} />
  //     )
  //   })
  // },

  // renderTodoForm() {
  //   return (
  //     <div className="col-9" id="todos">
  //       <TodoForm type="create"/>
  //     </div>
  //   )
  // },

  toggleDash() {
    $("#dashboard-right").toggleClass("dashboard-right-open")
  },

  render() {
    return (
      <div>
        <div className="col-2 contact-dashboard-component">
          <div className="col-2 container dashboard-right" id="dashboard-right">
            <div onClick={this.toggleDash}>
              <h1 className="fa fa-users"></h1>
            </div>

          </div>
        </div>
      </div>
    )
  }
})
