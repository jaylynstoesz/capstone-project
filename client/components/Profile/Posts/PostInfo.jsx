PostInfo = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    var postList = this.props.profile.posts || []
    return {
      allPosts: Posts.find({owner: this.props.profile._id}, {sort: {createdAt : -1}}).fetch(),
    }
  },

  _onClick() {
    event.preventDefault()
    Meteor.call("destroyPost", event.target.id)
  },

  renderPosts() {
    var allPosts = this.data.allPosts
    return allPosts.map((post) => {
      return (
        <Post key={post._id} post={post} editable={this.props.editable} clickToAdd={this.props.clickToAdd}/>
      )
    })
  },


  render() {
    return (
      <div>
        {this.renderPosts()}
      </div>
    )
  }
})
