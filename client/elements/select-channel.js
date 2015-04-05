Template.selectChannel.helpers({
  channels: function(){
    return Slack.channels({
      members: Meteor.user().services.slack.id
    });
  }
});
