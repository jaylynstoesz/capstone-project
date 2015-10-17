JobInfo = React.createClass({

  renderInfo() {
    var profile = this.props.profile.profile
    return (
      <div id="job-info" className="col-10">
        <h4>Career Interests</h4>
        <p>{profile.jobType} in {profile.desiredCity}, {profile.desiredState}</p>
        {this.props.editable ? <InterestsForm/> : null }
        <InterestsInfo clickToAdd={this.props.clickToAdd} profile={this.props.profile} editable={this.props.editable}/>
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
