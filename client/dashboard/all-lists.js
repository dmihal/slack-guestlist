Template.allLists.events({
  'click #newList': function(event, template){
    var user = Meteor.user();
    var channel = template.find('select').value;
    var id = Lists.insert({
      title: 'New List',
      spots: 0,
      eventDate: null,
      closes: null,
      owner: user._id,
      channel: channel,
      group: user.profile.team_id
    });
    Session.set('currentList', id);
  }
});
Template.allLists.helpers({
  lists: function(){
    return Lists.find();
  },
  channels: function(){
    return Slack.channels({
      members: Meteor.user().services.slack.id
    });
  }
});
