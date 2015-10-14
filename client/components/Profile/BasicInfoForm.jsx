BasicInfoForm = React.createClass({
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
      "bio"
    ]
  },

  getInitialState() {
    var allFields = this.allFields()
    var profile = this.props.profile || {}
    var formFields = {}
    for (var i = 0; i < allFields.length; i++) {
      formFields[allFields[i]] = profile[allFields[i]] || ""
    }
    return formFields
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

  componentDidMount() {
    this.validateForm()
  },

  render() {
    return (
      <div id="basic-info" className="container">
        <form className="col-8" onSubmit={this.handleSubmit}>
          <div className="col-8">
            <h5>Basic Information </h5>
          </div>
          <input className="col-4" ref="firstName" type="text" placeholder="First Name" onChange={this._onChange} name="firstName" value={this.state.firstName} />
          <input className="col-4" ref="lastName" type="text" placeholder="Last Name" onChange={this._onChange} name="lastName" value={this.state.lastName}/>
          <div className="col-8">
            <select className="col-3" ref="cohortType" value={this.state.cohortType} onChange={this._onChange} name="cohortType" >
              <option value="g">Full Stack</option>
              <option value="D">Data Science</option>
              <option value="gU">GalvanizeU</option>
            </select>
            <select className="col-1" ref="cohortNumber" value={this.state.cohortNumber} onChange={this._onChange} name="cohortNumber">
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
            <select className="col-4" ref="cohortLocation" value={this.state.cohortLocation} onChange={this._onChange} name="cohortLocation" >
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
          <input className="col-4" ref="jobTitle" type="text" placeholder="Job Title" onChange={this._onChange} name="jobTitle" value={this.state.jobTitle}/>
          <input className="col-4" ref="company" type="text" placeholder="Company" onChange={this._onChange} name="company" value={this.state.company}/>
          <div className="col-8">
            <h5>Where are you now? </h5>
          </div>
          <input className="col-7" ref="currentCity" type="text" placeholder="Current City" onChange={this._onChange} name="currentCity" value={this.state.currentCity}/>
          <input className="col-1" ref="currentState" type="text" placeholder="State" maxLength="2" onChange={this._onChange} name="currentState" value={this.state.currentState}/>
          <div className="col-8">
            <h5>Where do you want to be? </h5>
          </div>
          <input className="col-7" ref="desiredCity" type="text" placeholder="Desired City" onChange={this._onChange} name="desiredCity" value={this.state.desiredCity}/>
          <input className="col-1" ref="desiredState" type="text" placeholder="State" maxLength="2" onChange={this._onChange} name="desiredState" value={this.state.desiredState}/>
          <div className="col-8">
            <h5>Say something nice about yourself. </h5>
          </div>
          <textarea className="col-8" ref="bio" value={this.state.bio} name="bio" maxLength="500" onChange={this._onChange} rows="5"></textarea>
          <div className="col-8">
          <button id="submit-button" className="button disabled" type="submit" disabled={!this.state.canSubmit}>Update Info</button>
          </div>
        </form>
      </div>
    )
  },
  //
  // <input type="checkbox" value="Full Stack">Full Stack</input>
  // <input type="checkbox" value="Front End">Front End</input>
  // <input type="checkbox" value="Back End">Back End</input>
  // <input type="checkbox" value="Data Science">Data Science</input>
  //
  validateForm() {
    this.setState({canSubmit: true})
    $("#submit-button").removeClass("disabled")
    var allFields = this.allFields()
    for (var i = 0; i < allFields.length; i++) {
      var DOMNode = React.findDOMNode(this.refs[allFields[i]])
      if (DOMNode.value === "") {
        $("#submit-button").addClass("disabled")
        this.setState({canSubmit: false})
      }
    }
  },

  _onChange: function() {
    this.validateForm()
    validateField(event.target)
    var setModifier = {}
    setModifier[event.target.name] = event.target.value
    this.setState(setModifier);
  },

})
