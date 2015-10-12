Profile = React.createClass({

  getInitialState() {
    return {
      editing: false,
    }
  },

  componentWillMount() {
    this.setState({profile: this.getProfile()})
    if (!this.getProfile().profile && this.props.editable) {
      this.setState({editing: true})
    }
  },

  getProfile() {
    if (Meteor.users.findOne({ _id: this.props.page }) !== undefined) {
      return Meteor.users.findOne({ _id: this.props.page });
    } else {
      return false
    }
  },

  submitForm(userObject) {
    Meteor.call("updateUserProfile", userObject)
    this.setState({profile: this.getProfile()})
    this.toggleBasicForm()
  },

  toggleBasicForm() {
    this.setState({editing: !this.state.editing});
  },

  renderProfile() {
    var currentProfile = this.getProfile()
    return (
      <div id="profile-comp">
        <h1>This is the Profile</h1>
        {this.props.editable ? <button onClick={this.toggleBasicForm}>{this.state.editing ? "Cancel" : "Edit Profile"}</button> : null}
        {this.state.editing ? <BasicInfoForm profile={currentProfile.profile} submitForm={this.submitForm}/> : this.renderBasicInfo() }
      </div>
    )
  },

  renderBasicInfo() {
    var currentProfile = this.getProfile()
    return (
      <div>
        <BasicInfo profile={currentProfile}/>
        <JobInfo profile={currentProfile}/>
      </div>
    )
  },

  render() {
    return (
      <div>
        {this.state.profile ? this.renderProfile() : <h1>Oops! User not found.</h1>}
      </div>
    )
  }
})
