App = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user(),
    }
  },

  componentWillMount() {
    console.log("mounting app component");
  },

  render() {
    return (
      <div>
        <Navbar currentUser={this.data.currentUser ? this.data.currentUser : null}/>
        <Dashboard currentUser={this.data.currentUser ? this.data.currentUser : null} />
        {this.data.currentUser ? <ContactDash currentUser={this.data.currentUser} /> : null}
        {this.props.content}
      </div>
    )
  }
})
