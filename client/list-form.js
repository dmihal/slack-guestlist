Template.listForm.helpers({
  guests: function(){
    return Guests.find({
      list: this._id,
      owner: Meteor.userId()
    });
  }
});
Template.listForm.events({
  'click .newGuest': function(){
    Guests.insert({
      list: this._id,
      owner: Meteor.userId(),
      firstName: '',
      lastName: ''
    });
  }
});
