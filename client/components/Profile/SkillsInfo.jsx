SkillsInfo = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    var skillList = this.props.profile.skills || []
    return {
      allSkills: Skills.find({_id: {$in: skillList }}, {sort: {text: 1}}).fetch()
    }
  },

  _onClick() {
    event.preventDefault()
    Meteor.call("removeSkillFromUser", event.target.id)
  },

  renderSkills() {
    var allSkills = this.data.allSkills
    return allSkills.map((skill) => {
      return (
        <div key={skill._id} className="col-5 skill">{skill.text}
          <span id={skill._id} className="col-1 fa fa-remove" onClick={this._onClick}></span>
        </div>
      )
    })
  },


  render() {
    return (
      <div className="col-8">
        {this.renderSkills()}
      </div>
    )
  }
})
