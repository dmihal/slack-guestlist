Template.allLists.events({
  'click .listlink' : function(){
    Session.set('currentList', Lists.findOne()._id);
  }
});
Template.allLists.helpers({
  lists: function(){
    return Lists.find();
  }
});
