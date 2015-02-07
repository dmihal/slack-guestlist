Template.allLists.events({
  'click .listlink' : function(e){
    Session.set('currentList', Lists.findOne()._id);
    e.preventDefault();
  },
  'click #newList': function(e){
    var id = Lists.insert({
      title: 'New List',
      spots: 0,
      eventDate: null,
      closes: null,
      group: Meteor.user().profile.team_id
    });
    Session.set('currentList', id);
  }
});
Template.allLists.helpers({
  lists: function(){
    return Lists.find();
  }
});
