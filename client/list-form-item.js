Template.listFormItem.events({
  'blur .firstName, blur .lastName': function(e, template){
    var first = template.find('.firstName').value;
    var last = template.find('.lastName').value;
    Guests.update(this._id, {$set: {
      firstName: first,
      lastName: last
    }});
  },
  'click .remove': function(){
    Guests.remove(this._id);
  }
});
