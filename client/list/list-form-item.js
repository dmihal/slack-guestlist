Template.listFormItem.events({
  'blur .firstName, blur .lastName': function(e, template){
    var first = template.find('.firstName').value;
    var last = template.find('.lastName').value;
    TempGuests.update(this._id, {$set: {
      firstName: first,
      lastName: last
    }});
  },
  'click .remove': function(e){
    TempGuests.remove(this._id);
    e.preventDefault();
  }
});
