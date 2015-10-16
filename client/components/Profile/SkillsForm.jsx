SkillsForm = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      allSkills: Skills.find({}).fetch()
    }
  },

  getInitialState() {
    return {
      text: "",
      skillSelect: [],
    }
  },

  componentDidMount() {
    this.validateForm()
  },

  validateForm() {
    this.setState({canSubmit: true})
    $("#submit-skill-button").removeClass("disabled")
    var DOMNode = React.findDOMNode(this.refs.text)
    if (DOMNode.value === "" && DOMNode.required) {
      $("#submit-skill-button").addClass("disabled")
      this.setState({canSubmit: false})
    }
  },

  renderSkillSelect() {
    if (this.state.skillSelect === []) {
      return null
    } else {
      var set = this.state.skillSelect.map((skill) => {
        return (
          <div key={skill._id} className="skill" id={skill.text} onMouseOver={this._onMouseOver} onClick={this._onClick}>
            {skill.text}
          </div>
        )
      })
      return set.splice(0, 5) || set
    }
  },

  _onBlur() {
    if (React.findDOMNode(this.refs.text).value.trim() === "") {
      this.setState({skillSelect: []})
    }
  },

  _onClick() {
    this.handleSubmit(event)
  },

  _onMouseOver() {
    this.setState({text: event.target.id})
  },

  _onChange() {
    this.validateForm()
    validateField(event.target)
    this.setState({text: event.target.value}, )
    this.setState({skillSelect: fuzzyMatch(this.data.allSkills, event.target.value, 1)})
  },

  handleSubmit(event) {
    event.preventDefault()
    var DOMNode = React.findDOMNode(this.refs.text).value.trim()
    Meteor.promise("createSkill", DOMNode).then(function (result) {
      var skillId
      if (typeof result === "string") {
        skillId = result
      } else {
        skillId = result._id
      }
      Meteor.call("addSkillToUser", skillId)
    })
    this.setState({text: ""})
    this.setState({skillSelect: []})
  },

  render() {
    return (
      <form className="col-10" onSubmit={this.handleSubmit}>
        <input className="col-6" ref="text" name="text" type="text" placeholder="Add a new skill, tool, or technology" value={this.state.text} onChange={this._onChange} onBlur={this._onBlur} required></input>
        <button type="submit" id="sumbit-skill-button" disabled={!this.state.canSubmit} hidden></button>
        <div>
          {this.renderSkillSelect()}
        </div>
      </form>
    )
  }
})
