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
