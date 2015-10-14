Profile = React.createClass({

  getInitialState() {
    return {
      editing: false,
      saved: false
    }
  },

  componentWillMount() {
    this.setState({profile: this.getProfile()})
    if (!this.getProfile().profile && this.props.editable) {
      this.setState({editing: true})
    }
    // if (this.getProfile().profile.contacts && this.getProfile().profile.contacts.indexOf(this.props.page) >= 0) {
    //   this.setState({saved : true})
    // }
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

  toggleContact() {
    if (!this.state.saved) {
      Meteor.call("addContact", this.props.page)
    } else {
      Meteor.call("removeContact", this.props.page)
    }
    this.setState({saved: !this.state.saved})
  },

  renderProfile() {
    var currentProfile = this.getProfile()
    return (
      <div>
        <div className="container col-6 profile-component">
          {this.props.editable ? <div className="button" id="edit-profile-button" onClick={this.toggleBasicForm}>{this.state.editing ? "Cancel" : "Edit Profile"}</div> : <div className="button" id="add-contact-button" onClick={this.toggleContact}>{this.state.saved ? "Remove from contacts" : "Add to contacts"}</div>}
          {this.state.editing ? <BasicInfoForm profile={currentProfile.profile} submitForm={this.submitForm}/> : this.renderBasicInfo() }
        </div>
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
