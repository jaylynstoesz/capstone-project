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
      content: <Profile editable={Meteor.userId() === params.id} page={params.id}/>
    }, document.getElementById('render-app'))
  }
})
