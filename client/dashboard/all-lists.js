Template.allLists.events({
  'click #newList': function(e){
    var user = Meteor.user();
    var id = Lists.insert({
      title: 'New List',
      spots: 0,
      eventDate: null,
      closes: null,
      owner: user._id,
      group: user.profile.team_id
    });
    Session.set('currentList', id);
  }
});
Template.allLists.helpers({
  lists: function(){
    return Lists.find();
  }
});
