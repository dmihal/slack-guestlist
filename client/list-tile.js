Template.listTile.events({
  'click .listlink' : function(e){
    Session.set('currentList', this._id);
    e.preventDefault();
  }
});
Template.listTile.helpers({
  stats: function(){
    var statElements = [];
    
    var count = Guests.find({list: this._id}).count();
    statElements.push(count + " guests");

    return statElements.join(' - ')
  }
});
