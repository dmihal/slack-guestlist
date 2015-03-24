Template.home.events({
  'click #nav-logout': function(e){
    e.preventDefault();
    Meteor.logout();
  }
});
