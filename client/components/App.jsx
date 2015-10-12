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
        <Navbar />
        <Dashboard currentUser={this.data.currentUser}/>
        {this.props.content}
      </div>
    )
  }
})
