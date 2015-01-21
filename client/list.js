Template.list.helpers({
  list: function(){
    return Lists.findOne(Session.get('currentList'));
  }
});