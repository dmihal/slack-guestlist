Template.guestTable.helpers({
  guests: function(){
    return Guests.find({list:this._id});
  }
});