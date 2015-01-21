Template.list.events({
  'click .back': function(){
    Session.set('currentList',null);
  }
});
Template.list.helpers({
  list: function(){
    return Lists.findOne(Session.get('currentList'));
  }
});
