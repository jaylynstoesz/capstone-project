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
    this.setState({text: event.target.value}, )
    this.setState({skillSelect: fuzzyMatch(this.data.allSkills, event.target.value, 1)})
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
          <div
            className="panel-small"
            id={skill.text}
            key={skill._id}
            onClick={this._onClick}
            onMouseOver={this._onMouseOver}>
              {skill.text}
          </div>
        )
      })
      return set.splice(0, 5) || set
    }
  },

  render() {
    return (
      <form className="col-10" onSubmit={this.handleSubmit}>
        <input
          className="col-6"
          name="text"
          onChange={this._onChange}
          onBlur={this._onBlur}
          placeholder="Add a new skill, tool, or technology"
          ref="text"
          required
          type="text"
          value={this.state.text}/>
        <button
          disabled={!this.state.canSubmit}
          hidden
          id="sumbit-skill-button"
          type="submit"></button>
        <div className="col-5">
          {this.renderSkillSelect()}
        </div>
      </form>
    )
  }
})
