if (Meteor.isClient) {
  Meteor.subscribe("todos");
  Meteor.subscribe("userData");
  Meteor.subscribe("skills");
  Meteor.subscribe("interests");

  Accounts.ui.config({
    passwordSignupFields: "EMAIL_ONLY"
  });
}
