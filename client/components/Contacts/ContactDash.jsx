ContactDash = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    var contactList = this.props.currentUser.contacts || []
    return {
      allContacts: Meteor.users.find({_id: {$in: contactList }}, {sort: {firstName: 1}}).fetch()
    }
  },

  getInitialState() {
    return {
      viewing: false
    }
  },

  renderContacts() {
    var allContacts = this.data.allContacts
    return allContacts.map((contact) => {
      console.log(contact.profile);
      return (
        <div key={contact._id} contact={contact} className="col-10 contact">
          <a href={"/users/" + contact._id}>
              <span className="fa fa-envelope"> </span>
              <p><b>{contact.profile.firstName} {contact.profile.lastName}</b></p>
              <p>{contact.profile.currentCity}, {contact.profile.currentState} - {contact.profile.company}</p>
          </a>
        </div>
      )
    })
  },

  toggleDash() {
    $("#dashboard-right").toggleClass("dashboard-right-open")
  },

  render() {
    return (
      <div>
        <div className="col-2 contact-dashboard-component">
          <div className="col-2 container dashboard-right" id="dashboard-right">
            <div onClick={this.toggleDash}>
              <h1 className="fa fa-users">Your Contacts</h1>
            </div>
            <div id="contact-list">
              {this.renderContacts()}
            </div>
          </div>
        </div>
      </div>
    )
  }
})
