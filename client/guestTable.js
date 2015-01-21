Template.guestTable.helpers({
  guests: function(){
    Guests.find({list:this._id});
  }
});