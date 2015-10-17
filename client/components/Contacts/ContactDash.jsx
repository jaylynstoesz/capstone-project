ContactDash = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    var contactList = this.props.currentUser.contacts || []
    return {
      allContacts: Meteor.users.find({_id: {$in: contactList }}, {sort: {firstName: 1}}).fetch()
    }
  },

  toggleDash() {
    $(".dashboard-right").toggleClass("dashboard-right-open")
  },

  renderContacts() {
    var allContacts = this.data.allContacts
    return allContacts.map((contact) => {
      return (
        <div key={contact._id} contact={contact} className="col-8 panel-small">
          <a href={"/users/" + contact._id}>
            <span className="fa fa-envelope"> </span>
            <p><b>{contact.profile.firstName} {contact.profile.lastName} - {contact.profile.cohortType}{contact.profile.cohortNumber}</b></p>
            <p>{contact.profile.currentCity}, {contact.profile.currentState} - {contact.profile.company}</p>
          </a>
        </div>
      )
    })
  },

  render() {
    return (
      <div className="col-2 container dashboard-right">
        <div className="col-2" onClick={this.toggleDash}>
          <h1 className="fa fa-users"></h1>
        </div>
        <div className="col-8 contact-header">
          <h3>Contacts</h3>
        </div>
        <div className="col-10 contact-list">
          {this.renderContacts()}
        </div>
      </div>
    )
  }
})
