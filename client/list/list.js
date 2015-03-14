var getList = function(){
  return Lists.findOne(Session.get('currentList'));
};
GetNumRemainngGuests = function(){
  var list = getList();
  var numGuests = TempGuests.find({
    list: list._id
  }).count();
  var numGuestsAllowed = getNumAvailableGuests(list);
  return numGuestsAllowed - numGuests;
};

Template.list.events({
  'click .back': function(e){
    Session.set('currentList',null);
    e.preventDefault();
  },
  'blur .listTitle': function(e, template){
    var newVal = template.find('.listTitle').value;
    if (newVal.length > 0 && newVal !== this.title){
      Lists.update(this._id, {$set: {title: newVal}});
    }
  }
});
Template.list.helpers({
  list: getList
});
