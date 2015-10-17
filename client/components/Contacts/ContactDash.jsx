ContactDash = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    var contactList = this.props.currentUser.contacts || []
    return {
      allContacts: Meteor.users.find({_id: {$in: contactList }}, {sort: {firstName: 1}}).fetch(),
      allUsers: Meteor.users.find({_id: {$ne: this.props.currentUser._id }}, {sort: {firstName: 1}}).fetch()
    }
  },

  toggleDash() {
    $(".dashboard-right").toggleClass("dashboard-right-open")
  },

  renderContacts() {
    var allContacts = this.data.allContacts
    return allContacts.map((contact) => {
      return (
        <div key={contact._id} contact={contact} className="col-10 panel-small">
          <a href={"/users/" + contact._id}>
            <span className="fa fa-envelope"> </span>
            <p><b>{contact.profile.firstName} {contact.profile.lastName} - {contact.profile.cohortType}{contact.profile.cohortNumber}</b></p>
            <p>{contact.profile.currentCity}, {contact.profile.currentState} - {contact.profile.company}</p>
          </a>
        </div>
      )
    })
  },

  renderRecommendations() {
    // console.log(this.data.allUsers);
    var scores = this.data.allUsers.map((user) => {
      return recommend(this.props.currentUser, user)
    })
    var sorted = scores.sort(function (a, b) {
      if (a.score > b.score) { return 1 }
      if (a.score < b.score) { return -1 }
      return 0;
    }.bind(this))
    console.log(sorted);
    return sorted.map((user) => {
      return (
        <div key={user.user._id} className="col-10 panel-small">
          <a href={"/users/" + user.user._id}>
            <p><b>{user.user.profile.firstName} {user.user.profile.lastName} - {user.user.profile.cohortType}{user.user.profile.cohortNumber}</b></p>
            <p>{user.user.profile.currentCity}, {user.user.profile.currentState} - {user.user.profile.company}</p>
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
        <div className="col-8 contact-list">
          {this.renderContacts()}
        </div>
        <div className="col-8 contact-header">
          <h3>Recommended</h3>
        </div>
        <div className="col-8 recommended-list">
          {this.renderRecommendations()}
        </div>
      </div>
    )
  }
})
