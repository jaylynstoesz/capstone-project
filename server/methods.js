
if (Meteor.isServer) {
  // Meteor.publish("todos", function () {
  //   return Todos.find();
  // });

  Meteor.publish("userData", function () {
    return Meteor.users.find({})
  });

  Meteor.methods({

    updateUserProfile: function (userObject) {
      var foo = Object.keys(userObject)
      var setModifier = {};
      for (var i = 0; i < foo.length; i++) {
        setModifier["profile." + foo[i]] = userObject[foo[i]]
      }
      Meteor.users.update(Meteor.user()._id, { $set: setModifier })
    },

    testMe: function () {
      console.log("******************** TEST ********************");
    }

  })
}
