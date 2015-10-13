Navbar = React.createClass({
  render() {
    return (
      <div className="col-10 navbar-component">
        <div className="container">
          <div className="col-6">
            <a href={"/users"}>
              <h3>gSchool Alumni Network</h3>
            </a>
          </div>
          <div className="col-4">
            <a href="/users">
              <h5>Browse gSchoolers</h5>
            </a>
            <a href={this.props.currentUser ? "/users/" + this.props.currentUser._id : null}>
              <h5>{this.props.currentUser ? "Profile" : null}</h5>
            </a>
            <AccountsUIWrapper />
          </div>
        </div>
      </div>
    )
  }
})
