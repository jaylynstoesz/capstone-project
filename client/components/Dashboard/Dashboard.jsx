Dashboard = React.createClass({

  getInitialState() {
    return {
      viewing: false
    }
  },

  toggleDashboard() {
    this.setState({viewing: !this.state.viewing})
  },

  render() {
    return (
      <div>
        <div className="col-2 dashboard-component">
          {this.state.viewing ? <DashboardMax toggleDashboard={this.toggleDashboard}/> : <DashboardMin toggleDashboard={this.toggleDashboard}/>}
        </div>
      </div>
    )
  }
})

DashboardMin = React.createClass({
  render() {
    return (
      <div className="spacer">
        <div className="dashboard dashboard-min">
          <button onClick={this.props.toggleDashboard}>Show Dash</button>
        </div>
      </div>
    )
  }
})

DashboardMax = React.createClass({
  componentDidMount() {
    $("#dash").removeClass("animated slideOutLeft")
    $("#dash").addClass("animated slideInLeft")
  },

  componentWillUnmount() {
    $("#dash").removeClass("animated slideInLeft")
    $("#dash").addClass("animated slideOutLeft")
  },

  render() {
    return (
      <div id="dash" className="dashboard dashboard-max">
        <button onClick={this.props.toggleDashboard}>Show Dash</button>
        <h3>WOOOO</h3>
      </div>
    )
  }
})
