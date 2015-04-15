Guests.allow({
  insert: function (userId, doc) {
    return doc.owner === userId;
  },
  update: function (userId, doc, fields, modifier) {
    return (
      doc.owner === userId &&
      !_.contains(fields, 'owner')
      );
  },
  remove: function (userId, doc) {
    return doc.owner === userId;
  },
  fetch: ['owner']
});

Guests.deny({
  insert: function (userId, doc){
    //User must be logged in
    if (!userId){
      return true;
    }
    var count = Guests.find({
      owner: userId,
      list: doc.list
    }).count();
    var maxGuests = getNumAvailableGuests(doc.list, Meteor.users.find(userId));
    // Can't add guest if user is already at their limit
    if (count >= maxGuests){
      return true;
    }
    return false;
  },
  update: function (userId, docs, fields, modifier) {
    return !userId;
  },
  remove: function (userId, doc) {
    return !userId;
  },
  fetch: []
});
