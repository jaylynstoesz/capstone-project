Browse = React.createClass({

  renderUsers() {
    var allUsers = Meteor.users.find({}).fetch()
    return allUsers.map((user) => {
      return (
        <div key={user._id}>
          <a user={user} href={"/users/" + user._id}> User Profile </a>
        </div>
      )
    })
  },

  render() {
    return (
      <div>
        {this.renderUsers()}
      </div>
    )
  }
})
