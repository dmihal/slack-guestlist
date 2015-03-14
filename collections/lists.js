Lists = new Mongo.Collection("lists");

getNumAvailableGuests = function(list, user){
  if (Match.test(list, String)){
    list = Lists.findOne(list);
  }
  if (user === undefined){
    user = Meteor.user();
  }

  var limit = Infinity;
  limit = 10; // For dev
  return limit;
};
