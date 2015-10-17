App = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user(),
    }
  },


  campuses: [
    {id: "boulder", name: "Boulder", src: "/images/boulder.jpg"},
    {id: "denverPlatte", name: "Denver - Platte", src: "/images/coorsfield.jpg"},
    {id: "denverGolden", name: "Denver - Golden Triangle", src: "/images/DenverSkyline.png"},
    {id: "fortCollins", name: "Fort Collins", src: "/images/denver2.jpg"},
    {id: "sanFrancisco", name: "San Francisco", src: "/images/sanfrancisco.jpg"},
    {id: "seattle", name: "Seattle", src: "/images/seattle2.jpg"}
  ],


  render() {
    var divStyle = {
          backgroundImage: "url(/images/DenverSkyline.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          height: "57.25em",
        };
    if (this.data.currentUser) {
      for (var i = 0; i < this.campuses.length; i++) {
        if (this.data.currentUser.profile.cohortLocation === this.campuses[i].name) {
          divStyle.backgroundImage = "url(" + this.campuses[i].src + ")"
        }
      }
    }
    return (
      <div style={divStyle}>
        <Navbar currentUser={this.data.currentUser ? this.data.currentUser : null}/>
        {this.data.currentUser ? <Dashboard currentUser={this.data.currentUser} /> : <div className="col-2 dashboard-component"></div>}
        {this.data.currentUser ? <ContactDash currentUser={this.data.currentUser} /> : null}
        {this.props.content}
      </div>
    )
  }
})
