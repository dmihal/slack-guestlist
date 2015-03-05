Template.listForm.helpers({
  guests: function(){
    return TempGuests.find({
      list: this._id
    });
  }
});
Template.listForm.events({
  'click .newGuest': function(){
    TempGuests.insert({
      list: this._id,
      firstName: '',
      lastName: '',
      guestId: null
    });
  }
});
