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
      saved: false,
    }
  },

  clickToAdd() {
    var todoObject = {}
    todoObject.text = "Research " + event.target.innerHTML
    Meteor.call("createTodo", todoObject)
  },

  componentWillMount() {
    this.setState({profile: this.data.profile})
    this.setState({currentUser: this.data.currentUser})
  },

  componentDidMount() {
    if (!this.data.profile.profile.cohortNumber && this.props.editable) {
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
      <div className="container col-6 profile">
        {this.state.editing ? <BasicInfoForm profile={profile} submitForm={this.submitForm}/> : this.renderBasicInfo() }
      </div>
    )
  },

  renderBasicInfo() {
    var profile = this.data.profile
    return (
      <div className="col-10">
        <div className="col-10">
          {this.props.editable ? <div
                                    className="button"
                                    id="edit-profile-button"
                                    onClick={this.toggleBasicForm}>
                                      {this.state.editing ? "Cancel" : "Edit Info"}
                                  </div>
                                : <div
                                    className="button"
                                    hidden={this.props.currentUser == undefined}
                                    id="add-contact-button"
                                    onClick={this.toggleContact}>
                                      {this.state.saved ? "Remove contact" : "Save contact"}
                                  </div>
          }
          <BasicInfo profile={profile}/>
        </div>
        <div className="col-5">
          <div className="container col-10 panel">
            <h4>About</h4>
            <p>{profile.profile.bio}</p>
          </div>
          <div className="col-10 panel">
            <JobInfo clickToAdd={this.clickToAdd} profile={profile} editable={this.props.editable}/>
          </div>
          <div className="col-10 panel">
            <h4>Skills</h4>
            {this.props.editable ? <SkillsForm/> : null }
            <SkillsInfo clickToAdd={this.clickToAdd} profile={profile} editable={this.props.editable}/>
          </div>
        </div>
        <div className="col-5">
          <Gist profile={profile} username={profile.services.github.username}/>
        </div>
      </div>
    )
  },

  render() {
    console.log(this.state.profile)
    return (
      <div>
        {this.state.profile ? this.renderProfile() : <h1>Oops! User not found.</h1>}
      </div>
    )
  }
})
