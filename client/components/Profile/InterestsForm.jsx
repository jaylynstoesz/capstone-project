InterestsForm = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      allInterests: Interests.find({}).fetch()
    }
  },

  getInitialState() {
    return {
      text: "",
      interestSelect: [],
    }
  },

  componentDidMount() {
    this.validateForm()
  },

  handleSubmit(event) {
    event.preventDefault()
    var DOMNode = React.findDOMNode(this.refs.text).value.trim()
    Meteor.promise("createInterest", DOMNode).then(function (result) {
      var interestId
      if (typeof result === "string") {
        interestId = result
      } else {
        interestId = result._id
      }
      Meteor.call("addInterestToUser", interestId)
    })
    this.setState({text: ""})
    this.setState({interestSelect: []})
  },

  _onBlur() {
    if (React.findDOMNode(this.refs.text).value.trim() === "") {
      this.setState({interestSelect: []})
    }
  },

  _onClick() {
    this.handleSubmit(event)
  },

  _onChange() {
    this.validateForm()
    this.setState({text: event.target.value}, )
    this.setState({interestSelect: fuzzyMatch(this.data.allInterests, event.target.value, 1)})
  },

  _onMouseOver() {
    this.setState({text: event.target.id})
  },

  validateForm() {
    this.setState({canSubmit: true})
    $("#submit-interest-button").removeClass("disabled")
    var DOMNode = React.findDOMNode(this.refs.text)
    if (DOMNode.value === "" && DOMNode.required) {
      $("#submit-interest-button").addClass("disabled")
      this.setState({canSubmit: false})
    }
  },

  renderInterestSelect() {
    if (this.state.interestSelect === []) {
      return null
    } else {
      var set = this.state.interestSelect.map((interest) => {
        return (
          <div
            className="panel-small"
            id={interest.text}
            key={interest._id}
            onClick={this._onClick}
            onMouseOver={this._onMouseOver}>
              {interest.text}
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
          onBlur={this._onBlur}
          onChange={this._onChange}
          placeholder="Add something you're looking for"
          ref="text"
          required
          type="text"
          value={this.state.text}/>
        <button
          disabled={!this.state.canSubmit}
          hidden
          id="sumbit-interest-button"
          type="submit"></button>
        <div className="col-5">
          {this.renderInterestSelect()}
        </div>
      </form>
    )
  }
})
