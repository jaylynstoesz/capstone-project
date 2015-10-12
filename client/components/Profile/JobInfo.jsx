JobInfo = React.createClass({

  renderInfo() {
    var profile = this.props.profile.profile
    return (
      <div id="job-info">
        <h3>Seeking a position in {profile.desiredCity}, {profile.desiredState}</h3>
        <ul>
          <li>Front end</li>
          <li>Full stack</li>
        </ul>
        <h3>About</h3>
        <h3>{profile.bio}</h3>
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
