Browse = React.createClass({

  getInitialState() {
    return {
      locations: [
        {id: "boulder", checked: true, name: "Boulder"},
        {id: "denverPlatte", checked: true, name: "Denver - Platte"},
        {id: "denverGolden", checked: true, name: "Denver - Golden Triangle"},
        {id: "fortCollins", checked: true, name: "Fort Collins"},
        {id: "sanFrancisco", checked: true, name: "San Francisco"},
        {id: "seattle", checked: true, name: "Seattle"}
      ]
    }
  },

  renderCampuses() {
    var allCampuses = this.state.locations
    return allCampuses.map((campus) => {
      return (
        <tr key={campus.id}>
          <td><input type="checkbox" id={campus.id} name={campus.name} checked={campus.checked} onChange={this.toggleChecked}/></td>
          <td><label htmlFor={campus.id}>{campus.name}</label></td>
        </tr>
      )
    })
  },

  toggleChecked() {
    var locations = this.state.locations
    for (var i = 0; i < locations.length; i++) {
      if (locations[i].id === event.target.id) {
        this.setState(locations[i] = {id: locations[i].id, checked: event.target.checked, name: locations[i].name})
      }
    }
  },

  renderUsers() {
    var allUsers = Meteor.users.find({}).fetch()
    return allUsers.map((user) => {
      for (var i = 0; i < this.state.locations.length; i++) {
        if (user.profile.cohortLocation === this.state.locations[i].name && this.state.locations[i].checked) {
          user.viewing = true
        }
      }
      if (user.viewing) {
      console.log(user);
        return (
          <a key={user._id} user={user} href={"/users/" + user._id}>
            <div className="container col-10">
              <h2>{user.profile.firstName} {user.profile.lastName}</h2>
              <p>{user.profile.cohortType}{user.profile.cohortNumber} at {user.profile.cohortLocation}</p>
              <p>{user.profile.jobTitle} at {user.profile.company}</p>
              <p>{user.profile.currentCity}, {user.profile.currentState}</p>
            </div>
          </a>
        )
      }
    })
  },

  render() {
    return (
      <div>
        <div className="container col-2">
          <h4>Campuses</h4>
          <table>
            {this.renderCampuses()}
          </table>
        </div>
        <div className="container col-5" id="user-list">
          {this.renderUsers()}
        </div>
      </div>
    )
  }
})
