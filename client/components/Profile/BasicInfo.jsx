BasicInfo = React.createClass({

  renderInfo() {
    var profile = this.props.profile.profile
    return (
      <div className="container" id="basic-info">
        <h1>{profile.firstName} {profile.lastName}</h1>
        <p>{profile.cohortType}{profile.cohortNumber} at {profile.cohortLocation}</p>
        <p>{profile.jobTitle} at {profile.company} in {profile.currentCity}, {profile.currentState}</p>
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
