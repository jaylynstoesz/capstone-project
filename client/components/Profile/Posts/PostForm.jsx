PostForm = React.createClass({

  allFields() {
    return [
      "text",
    ]
  },

  getInitialState() {
    var allFields = this.allFields()
    var post = this.props.post || {}
    var formFields = {}
    for (var i = 0; i < allFields.length; i++) {
      formFields[allFields[i]] = post[allFields[i]] || ""
    }
    return formFields
  },

  componentDidMount() {
    this.validateForm()
  },

  handleSubmit(event) {
    event.preventDefault()
    var postObject = {}
    var allFields = this.allFields()
    for (var i = 0; i < allFields.length; i++) {
      var DOMNode = React.findDOMNode(this.refs[allFields[i]]).value.trim()
      postObject[allFields[i]] = DOMNode
    }
    postObject.private = false
    if (this.props.type === "create") {
      Meteor.call("createPost", postObject)
      this.setState({text: ""})
    } else if (this.props.type === "update"){
      postObject._id = this.props.post._id
      Meteor.call("updatePost", postObject)
      this.props.toggleForm()
    }
  },

  validateForm() {
    this.setState({canSubmit: true})
    var allFields = this.allFields()
    for (var i = 0; i < allFields.length; i++) {
      var DOMNode = React.findDOMNode(this.refs[allFields[i]])
      if (DOMNode.value === "") {
        this.setState({canSubmit: false})
      }
    }
  },

  _onChange: function() {
    this.validateForm()
    var setModifier = {}
    setModifier[event.target.name] = event.target.value
    this.setState(setModifier);
  },

  render() {
    return (
      <form className="col-9" onSubmit={this.handleSubmit}>
        <input
          className="col-10"
          maxLength="140"
          name="text"
          onChange={this._onChange}
          placeholder="Say something interesting."
          ref="text"
          type="text"
          value={this.state.text} />
        <button
          disabled={!this.state.canSubmit}
          hidden
          type="submit" />
      </form>
    )
  }
})
