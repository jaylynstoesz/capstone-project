BasicInfo = React.createClass({

  renderInfo() {
    var profile = this.props.profile.profile
    return (
      <div>
        <div id="basic-info" className="container" >
          <h1>{profile.firstName} {profile.lastName}</h1>
          <p>{profile.cohortType}{profile.cohortNumber} at {profile.cohortLocation}</p>
          <p>{profile.jobTitle} at {profile.company} in {profile.currentCity}, {profile.currentState}</p>
        </div>
        <div className="container col-5">
          <h4>About</h4>
          <p>{profile.bio}</p>
        </div>
      </div>
    )
  },

  render() {
    return (
      <div>
        {this.props.profile.profile ? this.renderInfo() : <h1>Add some info</h1>}
      </div>
    )
  }
})
