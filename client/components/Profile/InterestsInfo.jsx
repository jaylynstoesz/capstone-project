InterestsInfo = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    var interestList = this.props.profile.interests || []
    return {
      allInterests: Interests.find({_id: {$in: interestList }}, {sort: {text: 1}}).fetch()
    }
  },

  _onClick() {
    event.preventDefault()
    Meteor.call("removeInterestFromUser", event.target.id)
  },

  renderInterests() {
    var allInterests = this.data.allInterests
    return allInterests.map((interest) => {
      return (
        <div
          key={interest._id}
          className="col-5 panel-small" onDoubleClick={this.props.clickToAdd}>
          {interest.text}
          {this.props.editable ? <span
                                    id={interest._id}
                                    className="col-1 fa fa-remove"
                                    onClick={this._onClick}>
                                  </span>
                                : null }
        </div>
      )
    })
  },


  render() {
    return (
      <div>
        {this.renderInterests()}
      </div>
    )
  }
})
