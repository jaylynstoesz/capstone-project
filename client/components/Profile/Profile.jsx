Profile = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: this.getProfile(this.props.currentUser),
      profile: this.getProfile(this.props.page)
    }
  },

  getInitialState() {
    return {
      editing: false,
      saved: false
    }
  },

  componentDidMount() {
    this.setState({profile: this.data.profile})
    this.setState({currentUser: this.data.currentUser})
    if (!this.data.profile.profile && this.props.editable) {
      this.setState({editing: true})
    }
    if (this.data.currentUser.contacts && this.data.currentUser.contacts.indexOf(this.props.page) >= 0) {
      this.setState({saved : true})
    }
  },

  getProfile(userId) {
    if (Meteor.users.findOne({ _id: userId }) !== undefined) {
      return Meteor.users.findOne({ _id: userId });
    } else {
      return false
    }
  },

  submitForm(userObject) {
    Meteor.call("updateUserProfile", userObject)
    setTimeout(function () {
      this.setState({profile: this.data.profile})
      this.toggleBasicForm()
    }.bind(this), 100)
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
    var profile = this.data.profile
    return (
      <div>
        <div className="container col-6 profile-component">
          {this.state.editing ? <BasicInfoForm profile={profile.profile} submitForm={this.submitForm}/> : this.renderBasicInfo() }
        </div>
      </div>
    )
  },

  renderBasicInfo() {
    var profile = this.data.profile
    return (
      <div>
        <BasicInfo profile={profile}/>
        {this.props.editable ? <div className="button" id="edit-profile-button" onClick={this.toggleBasicForm}>{this.state.editing ? "Cancel" : "Edit Profile"}</div> : <div className="button" id="add-contact-button" onClick={this.toggleContact}>{this.state.saved ? "Remove contact" : "Save contact"}</div>}
        <JobInfo profile={profile}/>
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
