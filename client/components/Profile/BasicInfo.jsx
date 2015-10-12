BasicInfo = React.createClass({

  renderInfo() {
    var profile = this.props.profile.profile
    return (
      <div id="basic-info">
        <h1>{profile.firstName} {profile.lastName}</h1>
        <h3>{profile.cohortType}{profile.cohortNumber} - {profile.cohortLocation}</h3>
        <h3>{profile.currentCity}, {profile.currentState}</h3>
        <h3>{profile.jobTitle} at {profile.company}</h3>
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
