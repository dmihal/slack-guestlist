var filter = new ReactiveVar(null);

Template.guestTable.helpers({
  guests: function(){
    var query = {list: this._id};
    var filterVal = filter.get();
    if (filterVal){
      var regex = new RegExp('^'+filterVal, 'i');
      query["$or"] = [
        {firstName: regex},
        {lastName:  regex}
      ];
    }
    return Guests.find(query, {
      sort: {lastName: 1}
    });
  }
});
Template.guestTable.events({
  "keyup .filter, blur .filter": function(e, template){
    var filterVal = template.find('.filter').value;
    if (filterVal == ""){
      filterVal = null;
    }
    filter.set(filterVal);
  }
});
