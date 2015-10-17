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

    sendEmail: function (to, subject, text) {
      check([to, subject, text], [String]);

      this.unblock();

      Email.send({
        to: to,
        from: from,
        // from: Meteor.user().emails[0].address,
        subject: subject,
        text: text
      });
    },

    sendText: function () {
      console.log("********* Send text method ********", process.env.TWILIO_ACCOUNT_SID);
      twilio = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      twilio.sendSms({
        to:'+17206359387', // Any number Twilio can deliver to
        from: '+17206135663', // A number you bought from Twilio and can use for outbound communication
        body: 'word to your mother.' // body of the SMS message
      }, function(err, responseData) { //this function is executed when a response is received from Twilio
        if (err) {
          console.log("**** TWILIO ERROR ****", err);
        }
        if (!err) { // "err" is an error received during the request, if any
          // "responseData" is a JavaScript object containing data received from Twilio.
          // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
          // http://www.twilio.com/docs/api/rest/sending-sms#example-1
          console.log(responseData.from); // outputs "+14506667788"
          console.log(responseData.body); // outputs "word to your mother."
        }
      });
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
