BasicInfoForm = React.createClass({
  getInitialState() {
    var allFields = this.allFields()
    var profile = this.props.profile.profile || {}
    var formFields = {}
    for (var i = 0; i < allFields.length; i++) {
      formFields[allFields[i]] = profile[allFields[i]] || ""
      if (allFields[i] === "allowText") {
        formFields[allFields[i]] = profile[allFields[i]] || false
      }
    }
    return formFields
  },

  componentWillMount() {
    if (Meteor.userId() !== this.props.profile._id) {
      FlowRouter.go("/users")
    }
  },

  allFields() {
    return [
      "allowText",
      "bio",
      "company",
      "cohortType",
      "cohortNumber",
      "cohortLocation",
      "currentCity",
      "currentState",
      "desiredCity",
      "desiredState",
      "github",
      "jobTitle",
      "jobType",
      "linkedin",
      "name",
      "phone",
      "slack",
      "twitter"
    ]
  },

  componentDidMount() {
    this.validateForm()
  },

  deleteAccount() {
    Meteor.call("destroyUser")
    FlowRouter.go("/users")
  },

  handleSubmit(event) {
    event.preventDefault();
    var userObject = {}
    var allFields = this.allFields()
    for (var i = 0; i < allFields.length; i++) {
      var DOMNode = React.findDOMNode(this.refs[allFields[i]])
      if (DOMNode.type !== "checkbox" && DOMNode.type !== "radio") {
        DOMNode = DOMNode.value.trim()
      } else {
        DOMNode = DOMNode.checked
      }
      if (allFields[i] === "currentState" || allFields[i] === "desiredState") {
        DOMNode = DOMNode.toUpperCase()
      }
      userObject[allFields[i]] = DOMNode
    }
    this.props.submitForm(userObject)
  },

  toggleChecked() {
    var allowText = this.state.allowText
    this.setState({allowText: event.target.checked})
    this.forceUpdate()
  },

  _onChange: function() {
    this.validateForm()
    validateField(event.target)
    var setModifier = {}
    setModifier[event.target.name] = event.target.value
    this.setState(setModifier);
  },

  validateForm() {
    this.setState({canSubmit: true})
    $("#submit-info-button").removeClass("disabled")
    var allFields = this.allFields()
    for (var i = 0; i < allFields.length; i++) {
      var DOMNode = React.findDOMNode(this.refs[allFields[i]])
      if (DOMNode.value === "" && DOMNode.required) {
        $("#submit-info-button").addClass("disabled")
        this.setState({canSubmit: false})
      }
    }
  },

  render() {
    return (
      <div id="basic-info" className="container">
        <form className="col-8" onSubmit={this.handleSubmit}>
          <div className="col-8">
            <h5>Contact</h5>
          </div>
          <div className="col-10">
            <label htmlFor="phone" className="col-half fa fa-mobile social"></label>
            <input
              className="col-4"
              name="phone"
              onChange={this._onChange}
              placeholder="303-867-5309"
              ref="phone"
              type="tel"
              value={this.state.phone}/>
            <input
              checked={this.state.allowText}
              className="col-half"
              name="allowText"
              onChange={this.toggleChecked}
              ref="allowText"
              type="checkbox"
              checked={this.state.allowText} />
            <label htmlFor="allowText" className="col-4 small">Other gSchoolers can text me</label>
          </div>
          <div className="col-10">
            <label htmlFor="github" className="col-half fa fa-github social"></label>
            <input
              className="col-4"
              name="github"
              placeholder="https://www.github.com/zilkey"
              readOnly={this.props.profile.services.github}
              onChange={this._onChange}
              ref="github"
              type="text"
              value={this.props.profile.services.github ? "https://github.com" + this.props.profile.services.github.username : this.state.github}/>
          </div>
          <div className="col-10">
            <label htmlFor="linkedin" className="col-half fa fa-linkedin social"></label>
            <input
              className="col-4"
              name="linkedin"
              onChange={this._onChange}
              placeholder="https://www.linkedin.com/in/jeffdean"
              ref="linkedin"
              type="text"
              value={this.state.linkedin}/>
          </div>
          <div className="col-10">
            <label htmlFor="twitter" className="col-half fa fa-twitter social"></label>
            <input
              className="col-4"
              name="twitter"
              onChange={this._onChange}
              placeholder="https://twitter.com/jeffrosoft"
              ref="twitter"
              type="text"
              value={this.state.twitter}/>
          </div>
          <div className="col-10">
            <label htmlFor="slack" className="col-half fa fa-slack social"></label>
            <input
              className="col-4"
              name="slack"
              onChange={this._onChange}
              placeholder="@jeffdean"
              ref="slack"
              type="text"
              value={this.state.slack}/>
          </div>
          <div className="col-8">
            <h5>Basic Information</h5>
          </div>
          <div className="col-8">
            <h5>What's your full name? </h5>
          </div>
          <input
            className="col-4"
            name="name"
            onChange={this._onChange}
            placeholder="Jeff Dean"
            ref="name"
            required
            type="text"
            value={this.props.profile.services.github ? this.props.profile.profile.name : this.state.name}/>
          <div className="col-8">
            <select
              className="col-3"
              name="cohortType"
              onChange={this._onChange}
              ref="cohortType"
              required
              value={this.state.cohortType}>
              <option value="g">Full Stack</option>
              <option value="D">Data Science</option>
              <option value="gU">GalvanizeU</option>
            </select>
            <select
              className="col-1"
              name="cohortNumber"
              onChange={this._onChange}
              ref="cohortNumber"
              required
              value={this.state.cohortNumber}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <select
              className="col-4"
              name="cohortLocation"
              onChange={this._onChange}
              ref="cohortLocation"
              required
              value={this.state.cohortLocation}>
              <option value="Boulder">Boulder</option>
              <option value="Denver - Platte">Denver - Platte</option>
              <option value="Denver - Golden Triangle">Denver - Golden Triangle</option>
              <option value="Fort Collins">Fort Collins</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Seattle">Seattle</option>
            </select>
          </div>
          <div className="col-8">
            <h5>What's your current job? </h5>
          </div>
          <input
            className="col-4"
            name="jobTitle"
            onChange={this._onChange}
            placeholder="Job Title"
            ref="jobTitle"
            required
            type="text"
            value={this.state.jobTitle}/>
          <input
            className="col-4"
            name="company"
            onChange={this._onChange}
            placeholder="Company"
            ref="company"
            required
            type="text"
            value={this.state.company}/>
          <div className="col-8">
            <h5>Where are you now? </h5>
          </div>
          <input
            className="col-7"
            name="currentCity"
            onChange={this._onChange}
            placeholder="Current City"
            ref="currentCity"
            required
            type="text"
            value={this.state.currentCity}/>
          <input
            className="col-1"
            maxLength="2"
            name="currentState"
            onChange={this._onChange}
            placeholder="State"
            ref="currentState"
            required
            type="text"
            value={this.state.currentState}/>
          <div className="col-8">
            <h5>What do you want to do? </h5>
            <select
              className="col-4"
              onChange={this._onChange}
              name="jobType"
              ref="jobType"
              required
              value={this.state.jobType}>
              <option value="Full Stack development">Full Stack</option>
              <option value="Front End development">Front End</option>
              <option value="Back End development">Back End</option>
              <option value="Data Science">Data Science</option>
            </select>
          </div>
          <div className="col-8">
            <h5>Where do you want to be? </h5>
          </div>
          <input
            className="col-7"
            name="desiredCity"
            onChange={this._onChange}
            placeholder="Desired City"
            ref="desiredCity"
            required
            type="text"
            value={this.state.desiredCity}/>
          <input
            className="col-1"
            maxLength="2"
            name="desiredState"
            onChange={this._onChange}
            placeholder="State"
            ref="desiredState"
            required
            type="text"
            value={this.state.desiredState}/>
          <div className="col-8">
            <h5>Say something nice about yourself. </h5>
          </div>
          <textarea
            className="col-8"
            maxLength="200"
            name="bio"
            onChange={this._onChange}
            ref="bio"
            rows="3"
            value={this.state.bio}/>
          <div className="col-8">
            <button
              className="button disabled"
              disabled={!this.state.canSubmit}
              id="submit-info-button"
              type="submit">
              Update Info
            </button>
          </div>
        </form>
        <div className="container col-8">
          <button
            id="delete-account-button"
            className="button"
            onClick={this.deleteAccount}>
            Delete Account
          </button>
        </div>
      </div>
    )
  }

})
