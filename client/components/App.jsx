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
        <Dashboard currentUser={this.data.currentUser ? this.data.currentUser : null} />
        {this.props.content}
      </div>
    )
  }
})
