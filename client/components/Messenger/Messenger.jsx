Messenger = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: this.getProfile(this.props.currentUser),
      profile: this.getProfile(this.props.page)
    }
  },

  getInitialState() {
    return {
      type: "email",
      subject: "",
      body: ""
    }
  },

  getProfile(userId) {
    if (Meteor.users.findOne({ _id: userId }) !== undefined) {
      return Meteor.users.findOne({ _id: userId });
    } else {
      return false
    }
  },

  componentWillMount() {
    this.setState({profile: this.data.profile})
    this.setState({currentUser: this.data.currentUser})
  },

  handleSubmit() {
    event.preventDefault()
    var type = this.state.type
    if (type === "email") {
      var subject = React.findDOMNode(this.refs.subject).value.trim()
    }
    var body = React.findDOMNode(this.refs.body).value.trim()
    if (this.state.type === "email") {
      Meteor.call("sendEmail", "jaylynstoesz@gmail.com","jaylynstoesz@gmail.com", subject, body)
    } else if (this.state.type === "text") {
      console.log("sending text");
      Meteor.call("sendText")
    }
  },

  _onChange: function() {
    var setModifier = {}
    setModifier[event.target.name] = event.target.value
    this.setState(setModifier);
  },

  _onChangeType: function() {
    this.setState({type: event.target.value});
  },

  render() {
    var recipient = this.state.profile;
    return (
      <div className="container col-6 messenger">
        // <h1>Send {recipient.profile.firstName} a message</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="col-8">
            <h5>Message type</h5>
          </div>
          <div className="col-8">
            <select onChange={this._onChangeType} name="type" value={this.state.type}>
              <option value="email">Email</option>
              {recipient.profile.allowText ? <option value="text">Text Message</option> : null}
            </select>
          </div>
          {this.state.type === "email" ?
            <div>
              <div className="col-8">
                <h5>Subject</h5>
              </div>
              <div className="col-8">
                <input className="col-10" type="text" ref="subject" name="subject" id="subject" value={this.state.subject} onChange={this._onChange}/>
              </div>
            </div> : null }
          <div className="col-8">
            <h5>Body</h5>
          </div>
          <div className="col-8">
            <textarea className="col-10" rows={this.state.type === "email" ? "10" : "2"} maxLength={this.state.type === "text" ? "140" : "1000"} ref="body" value={this.state.body} name="body" id="body" onChange={this._onChange}/>
          </div>
          <div className="col-8">
            <button
              className="button"
              id="submit-message-button"
              type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    )
  }
})
