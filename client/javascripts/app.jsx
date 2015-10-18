if (Meteor.isClient) {
  Meteor.subscribe("todos");
  Meteor.subscribe("userData");
  Meteor.subscribe("skills");
  Meteor.subscribe("interests");
  Meteor.subscribe("snippets");

  Accounts.ui.config({
    requestPermissions: {
      github: ['user']
    },
    // passwordSignupFields: "NONE"
  });

}
