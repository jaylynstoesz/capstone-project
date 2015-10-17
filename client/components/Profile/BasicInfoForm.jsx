BasicInfoForm = React.createClass({
  getInitialState() {
    var allFields = this.allFields()
    var profile = this.props.profile || {}
    var formFields = {}
    for (var i = 0; i < allFields.length; i++) {
      formFields[allFields[i]] = profile[allFields[i]] || ""
    }
    return formFields
  },

  allFields() {
    return [
      "firstName",
      "lastName",
      "cohortType",
      "cohortNumber",
      "cohortLocation",
      "currentCity",
      "currentState",
      "jobTitle",
      "company",
      "desiredCity",
      "desiredState",
      "bio",
      "jobType"
    ]
  },

  componentDidMount() {
    this.validateForm()
  },

  handleSubmit(event) {
    event.preventDefault();
    var userObject = {}
    var allFields = this.allFields()
    for (var i = 0; i < allFields.length; i++) {
      var DOMNode = React.findDOMNode(this.refs[allFields[i]]).value.trim()
      if (allFields[i] === "currentState" || allFields[i] === "desiredState") {
        DOMNode = DOMNode.toUpperCase()
      }
      userObject[allFields[i]] = DOMNode
    }
    this.props.submitForm(userObject)
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
      if (DOMNode.value === "") {
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
            <h5>Basic Information</h5>
          </div>
          <input
            className="col-4"
            name="firstName"
            onChange={this._onChange}
            placeholder="First Name"
            ref="firstName"
            type="text"
            value={this.state.firstName} />
          <input
            className="col-4"
            name="lastName"
            onChange={this._onChange}
            placeholder="Last Name"
            ref="lastName"
            type="text"
            value={this.state.lastName}/>
          <div className="col-8">
            <select
              className="col-3"
              name="cohortType"
              onChange={this._onChange}
              ref="cohortType"
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
            type="text"
            value={this.state.jobTitle}/>
          <input
            className="col-4"
            name="company"
            onChange={this._onChange}
            placeholder="Company"
            ref="company"
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
            type="text"
            value={this.state.currentCity}/>
          <input
            className="col-1"
            maxLength="2"
            name="currentState"
            onChange={this._onChange}
            placeholder="State"
            ref="currentState"
            type="text"
            value={this.state.currentState}/>
          <div className="col-8">
            <h5>What do you want to do? </h5>
            <select
              className="col-4"
              onChange={this._onChange}
              name="jobType"
              ref="jobType"
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
            type="text"
            value={this.state.desiredCity}/>
          <input
            className="col-1"
            maxLength="2"
            name="desiredState"
            onChange={this._onChange}
            placeholder="State"
            ref="desiredState"
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
      </div>
    )
  }

})
