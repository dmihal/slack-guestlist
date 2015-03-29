Template.listTile.events({
  'click .listlink' : function(e){
    Router.go('list.show', this);
    e.preventDefault();
  }
});
Template.listTile.helpers({
  stats: function(){
    var statElements = [];
    
    var count = Guests.find({list: this._id}).count();
    statElements.push(count + " guests");

    return statElements.join(' - ')
  },
  channelName: function(){
    return Slack.channels(this.channel).name;
  }
});
