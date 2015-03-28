Template.listForm.helpers({
  guests: function(){
    return TempGuests.find({
      list: this._id
    });
  },
  addGuestDisabled: function(){
    return GetNumRemainngGuests() <= 0;
  },
  numRemainingGuests: function(){
    return GetNumRemainngGuests();
  }
});
Template.listForm.events({
  'click .newGuest': function(e){
    var sex = e.target.dataset.sex;
    TempGuests.insert({
      list: this._id,
      firstName: '',
      lastName: '',
      sex: sex,
      guestId: null
    });
  }
});
