TodoForm = React.createClass({

  allFields() {
    return [
      "text",
      "deadline",
    ]
  },

  getInitialState() {
    var allFields = this.allFields()
    var todo = this.props.todo || {}
    var formFields = {}
    for (var i = 0; i < allFields.length; i++) {
      formFields[allFields[i]] = todo[allFields[i]] || ""
    }
    return formFields
  },

  componentDidMount() {
    this.validateForm()
  },

  handleSubmit(event) {
    event.preventDefault()
    var todoObject = {}
    var allFields = this.allFields()
    for (var i = 0; i < allFields.length; i++) {
      var DOMNode = React.findDOMNode(this.refs[allFields[i]]).value.trim()
      todoObject[allFields[i]] = DOMNode
    }
    todoObject.private = false
    if (this.props.type === "create") {
      Meteor.call("createTodo", todoObject)
      this.setState({text: ""})
      this.setState({deadline: ""})
    } else if (this.props.type === "update"){
      todoObject._id = this.props.todo._id
      Meteor.call("updateTodo", todoObject, function (err, result) {
        if (err) {console.log(err);}
      })
      this.props.toggleForm()
    }
  },

  validateForm() {
    this.setState({canSubmit: true})
    var allFields = this.allFields()
    for (var i = 0; i < allFields.length; i++) {
      var DOMNode = React.findDOMNode(this.refs[allFields[i]])
      if (DOMNode.value === "" && DOMNode.required) {
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

  render() {
    return (
      <form className="col-9" onSubmit={this.handleSubmit}>
        <input
          className="col-10"
          name="text"
          onChange={this._onChange}
          placeholder="Add a new to-do"
          ref="text"
          required
          type="text"
          value={this.state.text} />
        <label htmlFor="deadline">Deadline (optional)</label>
        <input
          className="col-6 deadline"
          ref="deadline"
          name="deadline"
          onChange={this._onChange}
          type="date"
          value={this.state.deadline} />
        <button
          disabled={!this.state.canSubmit}
          hidden
          type="submit" />
      </form>
    )
  }
})
