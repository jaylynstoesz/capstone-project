Post = React.createClass({
  getInitialState() {
    return {
      editing: false
    }
  },

  destroyPost() {
    Meteor.call("destroyPost", this.props.post._id)
  },

  toggleForm() {
    this.setState({editing : !this.state.editing})
  },

  renderPost() {
    var createdAt = parseDate(this.props.post.createdAt.toString());
    return (
      <div className="col-9 panel-small">
        {this.props.editable ? <div className="col-10">
          <span className="fa fa-remove" onClick={this.destroyPost}></span>
          <span className="fa fa-pencil" onClick={this.toggleForm}></span>
        </div> : null}
        <div className="col-10" onDoubleClick={this.props.clickToAdd}>
          {this.props.post.text}
          <p><small>{moment(createdAt).fromNow()}</small></p>
        </div>
      </div>
    )
  },

  render() {
    var post = this.props.post
    return (
        <div>
          {this.state.editing ? <PostForm
                                  post={this.props.post}
                                  toggleForm={this.toggleForm}
                                  type="update" />
                                : this.renderPost() }
        </div>
    )
  }
})
