Lists = new Mongo.Collection("lists");

getNumAvailableGuests = function(list, user){
  if (Match.test(list, String)){
    list = Lists.findOne(list);
  }
  if (user === undefined){
    user = Meteor.user();
  }

  var limit = Infinity;
  if (list.limit){
    if (list.limit.type == "user"){
      limit = list.limit.guestsPerUser;
    } else if (list.limit.type == "unlock"){
      limit = list.limit.guestsPerUser;
      if (new Date() > list.limit.unlocks){
        var numUsers = Meteor.users.find({
          'profile.team_id': Meteor.user().profile.team_id
        }).count();
        var numOtherGuests = Guests.find({
          list: list._id,
          owner: {$ne: user._id}}
          ).count();
        limit = (limit * numUsers) - numOtherGuests;
      }
    }
  }
  return limit;
};
canEditList = function(list, user){
  if (Match.test(list, String)){
    list = Lists.findOne(list);
  }
  if (user === undefined){
    user = Meteor.user();
  }

  return (user._id == list.owner);
}
