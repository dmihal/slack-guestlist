Template.guestTableRow.helpers({
  owner: function(){
    var ownerName;
    var user = Meteor.users.findOne(this.owner);
    if (user.services && user.services.slack){
      var slackId = user.services.slack.id;
      ownerName = Slack.users(slackId).real_name;
    } else {
      ownerName = user.profile.name;
    }
    return ownerName;
  }
});
