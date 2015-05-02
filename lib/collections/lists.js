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
        var numUsers = getNumUsers(user);
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

//Todo: better way to do this
var getNumUsers = function(user){
  if (Meteor.isClient){
    return Slack.users().length;
  } else {
    var token = user.services.slack.accessToken;
    var users = Meteor.call('slack-users-list',{
      token: token
    });
    return users.length;
  }
};
