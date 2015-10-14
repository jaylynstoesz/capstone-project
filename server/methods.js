if (Meteor.isServer) {
  Meteor.publish("todos", function () {
    return Todos.find({});
  });

  Meteor.publish("userData", function () {
    return Meteor.users.find({})
  });

  Meteor.methods({

    updateUserProfile: function (userObject) {
      var props = Object.keys(userObject)
      var setModifier = {};
      for (var i = 0; i < props.length; i++) {
        setModifier["profile." + props[i]] = userObject[props[i]]
      }
      Meteor.users.update(Meteor.user()._id, { $set: setModifier })
    },

    addContact: function (userId) {
      var currentContacts = Meteor.user().contacts || []
      if (currentContacts.indexOf(userId) < 0) {
        currentContacts.push(userId)
      }
      Meteor.users.update(Meteor.user()._id, { $set: {contacts: currentContacts} })
      console.log(currentContacts);
    },

    removeContact: function (userId) {
      var currentContacts = Meteor.user().contacts || []
      var contactRemoved = currentContacts.filter(function (contact) {
        return contact !== userId
      })
      Meteor.users.update(Meteor.user()._id, { $set: {contacts: contactRemoved} })
    },

    createTodo: function (todoObject) {
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
      todoObject.owner = Meteor.userId()
      todoObject.createdAt = new Date()
      Todos.insert(todoObject)
    },

    updateTodo: function (todoObject) {
      var props = Object.keys(todoObject)
      var setModifier = {};
      for (var i = 0; i < props.length; i++) {
        setModifier[props[i]] = todoObject[props[i]]
      }
      console.log("***************", setModifier, "***************");
      Todos.update(todoObject._id, { $set: setModifier })
    },

    destroyTodo: function (todoId) {
      Todos.remove({_id: todoId})
    },

    testMe: function () {
      console.log("******************** TEST ********************");
    }

  })
}
