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

  Meteor.publish("interests", function () {
    return Interests.find({})
  });

  Meteor.publish("posts", function () {
    return Posts.find({})
  });


  Meteor.methods({

    ////// User Methods //////

    updateUserProfile: function (userObject) {
      var props = Object.keys(userObject)
      var setModifier = {};
      for (var i = 0; i < props.length; i++) {
        setModifier["profile." + props[i]] = userObject[props[i]]
      }
      Meteor.users.update(Meteor.user()._id, { $set: setModifier })
    },

    destroyUser: function (userId) {
      Meteor.users.remove(Meteor.userId())
    },

    addContact: function (userId) {
      var contactList = Meteor.user().contacts || []
      if (contactList.indexOf(userId) < 0) {
        contactList.push(userId)
      }
      Meteor.users.update(Meteor.user()._id, { $set: {contacts: contactList} })
    },

    removeContact: function (userId) {
      var contactList = Meteor.user().contacts || []
      var contactRemoved = contactList.filter(function (contact) {
        return contact !== userId
      })
      Meteor.users.update(Meteor.user()._id, { $set: {contacts: contactRemoved} })
    },

    sendText: function (to, body) {
      twilio = Twilio(Meteor.settings.TWILIO_ACCOUNT_SID, Meteor.settings.TWILIO_AUTH_TOKEN);
      return twilio.sendSms({
        to: to,
        from: '+17206135663',
        body: body
      }, function(err, responseData) {
        if (err) {
          console.log("**** TWILIO ERROR ****", err);
          return err
        }
        if (!err) {
          return responseData
        }
      });
    },

    /////// Gist Methods ///////

    getGists: function(username) {
      var GithubApi = Meteor.npmRequire('github');
      var github = new GithubApi({
        version: "3.0.0"
      });

      var gists = Async.runSync(function(done) {
        github.gists.getFromUser({user: username}, function(err, data) {
          done(null, data);
        });
      });
      return gists.result[0];
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

    ////// Post Methods //////

    createPost: function (postObject) {
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
      postObject.owner = Meteor.userId()
      postObject.createdAt = new Date()
      Posts.insert(postObject)
    },

    updatePost: function (postObject) {
      var props = Object.keys(postObject)
      var setModifier = {};
      for (var i = 0; i < props.length; i++) {
        setModifier[props[i]] = postObject[props[i]]
      }
      Posts.update(postObject._id, { $set: setModifier })
    },

    destroyPost: function (postId) {
      Posts.remove({_id: postId})
    },

    ////// Interests Methods //////

    createInterest: function (text) {
      if (Interests.findOne({text: text}) === undefined) {
        return Interests.insert({text: text})
      } else {
        return (Interests.findOne({text: text}));
      }
    },

    addInterestToUser: function (interestId) {
      var interestList = Meteor.user().interests || []
      if (interestList.indexOf(interestId) < 0) {
        interestList.push(interestId)
      }
      Meteor.users.update(Meteor.user()._id, { $set: {interests: interestList} })
    },

    removeInterestFromUser: function (interestId) {
      var interestList = Meteor.user().interests || []
      var interestRemoved = interestList.filter(function (interest) {
        return interest !== interestId
      })
      Meteor.users.update(Meteor.user()._id, { $set: {interests: interestRemoved} })
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

    /////// Test ///////

    testMe: function () {
      console.log("******************** TEST ********************");
    }

  })
}
