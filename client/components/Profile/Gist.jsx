Gist = React.createClass({

  componentDidMount() {
    Meteor.call("getGists", this.props.username, function (err, res) {
      this.setState({gist: res})
    }.bind(this))
  },


  renderGist() {
    if (this.state) {
      return <GistEmbed key={this.state.gist.id} gistId={this.state.gist.id}/>
    }
  },

  render() {
    return (
      <div className="col-10 panel">
        <h3>My latest Gist</h3>
        {this.renderGist()}
        <p>{this.state ? this.state.gist.description : null}</p>
      </div>
    )
  }
})
