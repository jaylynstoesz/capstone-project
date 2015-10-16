App = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user(),
    }
  },

  render() {
    return (
      <div>
        <Navbar currentUser={this.data.currentUser ? this.data.currentUser : null}/>
        {this.data.currentUser ? <Dashboard currentUser={this.data.currentUser} /> : <div className="col-2 dashboard-component"></div>}
        {this.data.currentUser ? <ContactDash currentUser={this.data.currentUser} /> : null}
        {this.props.content}
      </div>
    )
  }
})
