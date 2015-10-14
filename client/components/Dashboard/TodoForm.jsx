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

  validateForm() {
    this.setState({canSubmit: true})
    $("#submit-button").removeClass("disabled")
    var allFields = this.allFields()
    for (var i = 0; i < allFields.length; i++) {
      var DOMNode = React.findDOMNode(this.refs[allFields[i]])
      if (DOMNode.value === "" && DOMNode.required) {
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
    } else if (this.props.type === "update"){
      todoObject._id = this.props.todo._id
      Meteor.call("updateTodo", todoObject)
      this.props.toggleForm()
    }
    React.findDOMNode(this.refs.text).value = ""
    React.findDOMNode(this.refs.deadline).value = ""
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input className="col-9" ref="text" name="text" type="text" placeholder="Add a new to-do" value={this.state.text} onChange={this._onChange} required></input>
        <label htmlFor="deadline">Deadline (optional)</label>
        <div>
          <input className="col-7" ref="deadline" name="deadline" type="date" name="deadline" value={this.state.deadline} onChange={this._onChange}></input>
          <button id="submit-button" className={this.props.type === "create" ? "button button-small" : "button  col-2"} type="submit" value="Update Info" disabled={!this.state.canSubmit}><span className={this.props.type === "create" ? "fa fa-plus" : "fa fa-check"}></span></button>
        </div>
      </form>
    )
  }
})
