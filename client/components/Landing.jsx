Landing = React.createClass({
  render() {
    return (
      <div className="col-10 landing-page">
        <div className="col-10 banner">
          <header>Welcome to the gSchool Alumni Network.</header>
          <a className="landing-button" href="/users">Check it out</a>
        </div>
        <div className="container col-10 landing-tiles">
          <div className="container col-2">
            <h4>Make useful connections</h4>
            <p>Get recommended contacts by filling your profile with technologies you've learned, things you're looking for in an employer, where you want to be located, and more.</p>
          </div>
          <div className="container col-2">
            <h4>Learn from your classmates</h4>
            <p>Double-click any skill, career interest, or timeline post to add cool things from other profiles to your personal to-do list.</p>
          </div>
          <div className="container col-2">
            <h4>Make direct contact</h4>
            <p>Forget emails - we're all friends here. Send your contacts a text or reach out on Slack with questions, resources, and job opportunities.</p>
          </div>
        </div>
        <div className="container col-6 about">
          <div className="container col-10">
            <h1>About the app</h1>
            <p>This app is a final project for the Galvanize Full Stack program in Denver, CO, USA. The app is a small social network that connects gSchool alumni so they can learn from each other and help each other with their job search. Users create a profile with their basic information, make a to-do list with deadlines, and save another user's profile to a contact list. They can also add a list of their skills and career interests to their profile, which are used to match them with similar alumni.</p>
            <p>Future features will include more embedded messaging options, a more robust profile for enhanced contact recommendations, resource forums, and private job boards.</p>
            <a href="https://github.com/jaylynstoesz/capstone-project" target="_blank">View the project on Github</a>
            <div className="col-10">
              <h4>Created with:</h4>
              <img id="react-logo" src="/images/react2.png"></img><img id="meteor-logo" src="/images/meteor.png"></img>
            </div>
          </div>
          <div className="container col-10 landing-contact">
            <div className="container">
              <header>Jaylyn Stoesz</header>
              <h3 id="h-white">Full Stack Web Developer</h3>
              <table>
                <tr>
                  <td><h4 className="fa fa-envelope social"></h4></td>
                  <td><h4>jaylynstoesz@gmail.com</h4></td>
                </tr>
                <tr>
                  <td><img className="social" src="/images/galvanize_g.png"></img></td>
                  <td id="g-link"><a href="https://students.galvanize.com/people/403" target="_blank"><h4>students.galvanize.com/people/403</h4></a></td>
                </tr>
                <tr>
                  <td><h4 className="fa fa-github social"></h4></td>
                  <td><a href="https://github.com/jaylynstoesz" target="_blank"><h4>github.com/jaylynstoesz</h4></a></td>
                </tr>
                <tr>
                  <td><h4 className="fa fa-twitter social"></h4></td>
                  <td><a href="https://twitter.com/jaylynstoesz" target="_blank"><h4>twitter.com/jaylynstoesz</h4></a></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
