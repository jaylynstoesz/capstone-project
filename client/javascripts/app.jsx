if (Meteor.isClient) {
  Meteor.subscribe("todos");
  Meteor.subscribe("userData");

  Accounts.ui.config({
    passwordSignupFields: "EMAIL_ONLY"
  });
}
