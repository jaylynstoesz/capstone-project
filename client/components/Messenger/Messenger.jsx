Messenger = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: this.getProfile(this.props.currentUser),
      profile: this.getProfile(this.props.page)
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
    this.setState({body: ""})
    this.setState({profile: this.data.profile})
    this.setState({currentUser: this.data.currentUser})
  },

  handleSubmit() {
    event.preventDefault()
    var sender = this.state.currentUser
    console.log(sender);
    var recipient = this.state.profile

    var body = "Message from " + sender.profile.name + " on the gSchool Alumni network: " +  React.findDOMNode(this.refs.body).value.trim() + " - Respond at " + sender.profile.phone + " or " + sender.services.github.email

    var phone = "+1" + recipient. profile.phone.replace(/-|(|)|./g, "")
    Meteor.call("sendText", phone, body)
    FlowRouter.go("/users/" + recipient._id)
  },

  _onChange: function() {
    var setModifier = {}
    setModifier[event.target.name] = event.target.value
    this.setState(setModifier);
  },

  render() {
    var recipient = this.state.profile;
    return (
      <div className="container col-6 messenger">
        <h3>Send {recipient.profile.firstName} a text message</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="col-6">
            <textarea
              className="col-10"
              maxLength="140"
              name="body"
              onChange={this._onChange}
              placeholder="Saw your profile, and I'd like to ask you about that one thing."
              ref="body" value={this.state.body}
              rows="2"/>
          </div>
          <div className="col-6">
            <div className="col-8">
              <button
                className="button"
                id="submit-message-button"
                type="submit">
                Send
              </button>
            </div>
            <h5 className="col-2">{140 - this.state.body.length}</h5>
          </div>
        </form>
      </div>
    )
  }
})
