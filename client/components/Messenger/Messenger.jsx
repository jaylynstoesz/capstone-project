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
    var sender = this.state.currentUser
    var recipient = this.state.profile
    var type = this.state.type
    if (type === "email") {
      var subject = React.findDOMNode(this.refs.subject).value.trim()
    }

    var body = "Message from " + sender.profile.firstName + " " + sender.profile.lastName + " on the gSchool Alumni network: " +  React.findDOMNode(this.refs.body).value.trim() + " Respond at " + sender.profile.phone

    if (this.state.type === "email") {
      Meteor.call("sendEmail", "jaylynstoesz@gmail.com","jaylynstoesz@gmail.com", subject, body)
    } else if (this.state.type === "text") {
      var phone = "+1" + recipient. profile.phone.replace(/-|(|)|./g, "")
      Meteor.promise("sendText", phone, body).then(function (result) {
        console.log(result);
      })
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

  test() {
    Meteor.call("testMe")
  },

  render() {
    var recipient = this.state.profile;
    return (
      <div className="container col-6 messenger">
        <h1>Send {recipient.profile.firstName} a message</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="col-8">
            <h5>Message type</h5>
          </div>
          <div className="col-8">
            <select
              name="type"
              onChange={this._onChangeType}
              value={this.state.type}>
              <option value="email">Email</option>
              {recipient.profile.allowText && recipient.profile.phone ? <option value="text">
                                                                          Text Message</option>
                                                                      : null}
            </select>
          </div>
          {this.state.type === "email" ?
            <div>
              <div className="col-8">
                <h5>Subject</h5>
              </div>
              <div className="col-8">
                <input
                  className="col-10"
                  name="subject"
                  onChange={this._onChange}
                  placeholder="Hello fellow gSchooler!"
                  ref="subject"
                  type="text"
                  value={this.state.subject} />
              </div>
            </div> : null }
          <div className="col-8">
            <h5>Body</h5>
          </div>
          <div className="col-8">
            <textarea
              className="col-10"
              maxLength={this.state.type === "text" ? "140" : "1000"}
              name="body"
              onChange={this._onChange}
              placeholder="Saw your profile, and I'd like to ask you about that one thing."
              ref="body" value={this.state.body}
              rows={this.state.type === "email" ? "10" : "2"}/>
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
        <button onClick={this.test}>Click me</button>
      </div>
    )
  }
})
