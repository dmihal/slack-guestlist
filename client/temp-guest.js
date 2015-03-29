Meteor.startup(function(){
  TempGuests = new Mongo.Collection(null);

  TempGuests.find({
    firstName: {$ne: ''},
    lastName: {$ne: ''},
    guestId: null
  }).observe({
    added: function(doc){
      Guests.insert({
        firstName: doc.firstName,
        lastName: doc.lastName,
        owner: Meteor.userId(),
        list: doc.list
      }, function(err, id){
        if (!err){
          TempGuests.update(doc._id, {$set: {
            guestId: id
          }});
        }
      });
    }
  });
  TempGuests.find({
    guestId: {$ne: null}
  }).observe({
    changed: function(newDoc, oldDoc){
      if (newDoc.firstName !== "" &&
          newDoc.lastName  !== "" &&
          (newDoc.firstName !== oldDoc.firstName ||
           newDoc.lastName  !== oldDoc.lastName)){
        Guests.update(newDoc.guestId, {$set: {
          firstName: newDoc.firstName,
          lastName: newDoc.lastName
        }});
      }
    },
    removed: function(doc){
      Guests.remove(doc.guestId);
    }
  });

  Guests.find({
    owner: Meteor.userId()
  }).observe({
    added: function(doc){
      doc.guestId = doc._id;
      delete doc._id;
      TempGuests.upsert({
        firstName: doc.firstName,
        lastName: doc.lastName,
        list: doc.list
      }, doc);
    },
    changed: function(doc){
      TempGuests.update({
        guestId: doc._id
      },{$set: {
        firstName: doc.firstName,
        lastName: doc.lastName
      }});
    },
    removed: function(doc){
      var temp = TempGuests.findOne({guestId: doc._id});
      TempGuests.remove(temp._id);
    }
  });
});