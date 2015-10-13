Browse = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      allUsers: Meteor.users.find({}, {sort: {firstName: 1}}).fetch()
    }
  },

  getInitialState() {
    return {
      campuses: [
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
    var allCampuses = this.state.campuses
    return allCampuses.map((campus) => {
      return (
        <tr key={campus.id}>
          <td><input type="checkbox" id={campus.id} name={campus.name} checked={campus.checked} onChange={this.toggleCampus}/></td>
          <td><label htmlFor={campus.id}>{campus.name}</label></td>
        </tr>
      )
    })
  },

  toggleCampus() {
    var campuses = this.state.campuses
    for (var i = 0; i < campuses.length; i++) {
      if (campuses[i].id === event.target.id) {
        campuses[i].checked = event.target.checked
        this.forceUpdate()
      }
    }
  },

  renderUsers() {
    var allUsers = this.data.allUsers
    return allUsers.map((user) => {
      for (var i = 0; i < this.state.campuses.length; i++) {
        if (user.profile.cohortLocation === this.state.campuses[i].name && this.state.campuses[i].checked) {
          user.viewing = true
        }
      }
      if (user.viewing) {
        return (
          <a key={user._id} user={user} href={"/users/" + user._id}>
            <div className="container col-10">
              <h2>{user.profile.firstName} {user.profile.lastName}</h2>
              <p>{user.profile.cohortType}{user.profile.cohortNumber} at {user.profile.cohortLocation}</p>
              <p>{user.profile.jobTitle} at {user.profile.company}</p>
              <p>Located in {user.profile.currentCity}, {user.profile.currentState}</p>
            </div>
          </a>
        )
      }
    })
  },

  render() {
    return (
      <div className="container col-8 browse-component">
        <div className="container col-2 browse-inner">
          <h4>Campuses</h4>
          <table>
            {this.renderCampuses()}
          </table>
        </div>
        <div className="container col-5 browse-inner" id="user-list">
          {this.renderUsers()}
        </div>
      </div>
    )
  }
})
