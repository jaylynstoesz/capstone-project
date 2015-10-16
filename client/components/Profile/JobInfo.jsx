JobInfo = React.createClass({

  renderInfo() {
    var profile = this.props.profile.profile
    return (
      <div id="job-info">
        <div>
          <h4>About</h4>
          <p>{profile.bio}</p>
        </div>
        <div>
          <h4>Interests</h4>
          <p>{profile.jobType} in {profile.desiredCity}, {profile.desiredState}</p>
        </div>
      </div>
    )
  },

  render() {
    var profile = this.props.profile.profile
    return (
      <div>
        {this.props.profile.profile ? this.renderInfo() : <h1>Add some info</h1>}
      </div>
    )
  }
})
