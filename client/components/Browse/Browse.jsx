Browse = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      allUsers: Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch()
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
      ],
      sortBy: "name",
    }
  },

  _onChange() {
    this.setState({sortBy: React.findDOMNode(this.refs.sortBy).value})
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

  renderCampuses() {
    var allCampuses = this.state.campuses
    return allCampuses.map((campus) => {
      return (
        <tr key={campus.id}>
          <td><input
            checked={campus.checked}
            id={campus.id}
            name={campus.name}
            onChange={this.toggleCampus}
            type="checkbox"/>
          </td>
          <td>
            <label
              htmlFor={campus.id}>
              {campus.name}
            </label>
          </td>
        </tr>
      )
    })
  },

  renderUsers() {
    allUsers = this.data.allUsers.sort(function (a, b) {
      var sortBy = this.state.sortBy
      if (a.profile && b.profile) {
        if (a.profile[sortBy] > b.profile[sortBy]) { return 1 }
        if (a.profile[sortBy] < b.profile[sortBy]) { return -1 }
      }
      return 0;
    }.bind(this))
    return allUsers.map((user) => {
      for (var i = 0; i < this.state.campuses.length; i++) {
        if (user.profile && user.profile.cohortLocation === this.state.campuses[i].name && this.state.campuses[i].checked) {
          user.viewing = true
        }
      }
      if (user.viewing) {
        return (
          <a href={"/users/" + user._id}
            key={user._id}
            user={user}>
            <div className="container col-10">
              <h2>{user.profile.name}</h2>
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
      <div>
        <div className="container col-6 browse">
          <div className="container col-4 browse-inner">
            <div className="container col-10">
              <h5>Sort By: </h5>
              <select ref="sortBy" value={this.state.sortBy} onChange={this._onChange} >
                <option value="name">First Name</option>
                <option value="cohortType">Program</option>
                <option value="corhortNumber">Cohort Number</option>
                <option value="currentCity">City</option>
                <option value="currentState">State</option>
                <option value="company">Company</option>
              </select>
            </div>
            <div className="container col-10">
              <h4>Campuses</h4>
              <table>
                {this.renderCampuses()}
              </table>
            </div>
          </div>
          <div className="container col-6 browse-inner" id="user-list">
            {this.renderUsers()}
          </div>
        </div>
      </div>
    )
  }
})
