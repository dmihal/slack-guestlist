Template.list.events({
  'click .back': function(){
    Session.set('currentList',null);
  },
  'blur .listTitle': function(e, template){
    var newVal = template.find('.listTitle').value;
    if (newVal.length > 0 && newVal !== this.title){
      Lists.update(this._id, {$set: {title: newVal}});
    }
  }
});
Template.list.helpers({
  list: function(){
    return Lists.findOne(Session.get('currentList'));
  }
});
