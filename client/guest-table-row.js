Template.guestTableRow.helpers({
  owner: function(){
    return Meteor.users.findOne(this.owner).profile.name;
  }
});
