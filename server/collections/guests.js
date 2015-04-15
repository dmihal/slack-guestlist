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
    return !userId;
  },
  update: function (userId, docs, fields, modifier) {
    return !userId;
  },
  remove: function (userId, doc) {
    return !userId;
  },
  fetch: []
});
