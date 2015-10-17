Modal = React.createClass({



  render() {
    return (
      <dialog open={this.props.open}>
        <p>Greetings, one and all!</p>
      </dialog>
    )
  }
})
