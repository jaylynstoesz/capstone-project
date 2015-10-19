Gist = React.createClass({

  getInitialState() {
    return {
      gist: false
    }
  },

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
    if (this.state.gist) {
      var description = this.state.gist.description
    }
    return (
      <div>
        <p>{description ? description : null}</p>
        {this.renderGist()}
      </div>
    )
  }
})
