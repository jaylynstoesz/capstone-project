if (Meteor.isClient) {
  Meteor.subscribe("todos");
  Meteor.subscribe("userData");
  Meteor.subscribe("skills");

  Accounts.ui.config({
    passwordSignupFields: "EMAIL_ONLY"
  });
}
