BasicInfo = React.createClass({

  renderInfo() {
    var profile = this.props.profile.profile
    return (
      <div>
        <div id="basic-info" className="container" >
          <h1>{profile.firstName} {profile.lastName}</h1>
          <p>{profile.cohortType}{profile.cohortNumber} at {profile.cohortLocation}</p>
          <p>{profile.jobTitle} at {profile.company} in {profile.currentCity}, {profile.currentState}</p>
          <div className="container col-10 social-links">
            {profile.github ? <a
                                className="col-half fa fa-github social"
                                href={profile.github}
                                target="_blank">
                              </a> : null}
            {profile.linkedin ? <a
                                className="col-half fa fa-linkedin social"
                                href={profile.linkedin}
                                target="_blank">
                              </a> : null}
            {profile.twitter ? <a
                                className="col-half fa fa-twitter social"
                                href={profile.twitter}
                                target="_blank">
                              </a> : null}
          </div>
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
