if (Meteor.isClient) {
  Meteor.subscribe("todos");
  Meteor.subscribe("userData");
  Meteor.subscribe("skills");
  Meteor.subscribe("interests");
  Meteor.subscribe("snippets");

  Accounts.ui.config({
    passwordSignupFields: "EMAIL_ONLY"
  });

}
