FlowRouter.route('/', {
  triggersEnter: function(context, redirect) {
    redirect('/users');
  }
})

FlowRouter.route('/users', {
  action: function() {
    ReactLayout.render(App, {
      content: <Browse />
    }, document.getElementById('render-app'))
  }
})

FlowRouter.route('/users/:id', {
  action: function(params) {
    ReactLayout.render(App, {
      content: <Profile key={Meteor.userId()} editable={Meteor.userId() === params.id} page={params.id} currentUser={Meteor.userId()}/>
    }, document.getElementById('render-app'))
  }
})
