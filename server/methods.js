if (Meteor.isServer) {
  Meteor.publish("todos", function () {
    return Todos.find({});
  });

  Meteor.publish("userData", function () {
    return Meteor.users.find({})
  });

  Meteor.publish("skills", function () {
    return Skills.find({})
  });

  Meteor.methods({

    ////// User Methods //////

    updateUserProfile: function (userObject) {
      var props = Object.keys(userObject)
      var setModifier = {};
      for (var i = 0; i < props.length; i++) {
        setModifier["profile." + props[i]] = userObject[props[i]]
      }
      console.log("***************", setModifier, "****************");
      Meteor.users.update(Meteor.user()._id, { $set: setModifier })
    },

    addContact: function (userId) {
      var contactList = Meteor.user().contacts || []
      if (contactList.indexOf(userId) < 0) {
        contactList.push(userId)
      }
      Meteor.users.update(Meteor.user()._id, { $set: {contacts: contactList} })
      console.log(currentContacts);
    },

    removeContact: function (userId) {
      var contactList = Meteor.user().contacts || []
      var contactRemoved = contactList.filter(function (contact) {
        return contact !== userId
      })
      Meteor.users.update(Meteor.user()._id, { $set: {contacts: contactRemoved} })
    },

    ////// Skills Methods //////

    createSkill: function (text) {
      if (Skills.findOne({text: text}) === undefined) {
        return Skills.insert({text: text})
      } else {
        return (Skills.findOne({text: text}));
      }
    },

    addSkillToUser: function (skillId) {
      var skillList = Meteor.user().skills || []
      if (skillList.indexOf(skillId) < 0) {
        skillList.push(skillId)
      }
      Meteor.users.update(Meteor.user()._id, { $set: {skills: skillList} })
    },

    removeSkillFromUser: function (skillId) {
      var skillList = Meteor.user().skills || []
      var skillRemoved = skillList.filter(function (skill) {
        return skill !== skillId
      })
      Meteor.users.update(Meteor.user()._id, { $set: {skills: skillRemoved} })
    },

    ////// Todo Methods //////

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
