Meteor.startup(function(){
  TempGuests = new Mongo.Collection();

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
          TempGuests(doc._id, {
            guestId: id
          });
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
        Guests.update(newDoc.guestId, {
          firstName: newDoc.firstName,
          lastName: newDoc.lastName
        });
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
      if (TempGuests.find({guestId: doc._id).count() == 0){
        TempGuests.insert({
          firstName: doc.firstName,
          lastName: doc.lastName,
          guestId: doc._id,
          list: doc.list
        });
      }
    },
    changed: function(doc){
      TempGuests.update({
        guestId: doc._id
      },{
        firstName: doc.firstName,
        lastName: doc.lastName
      });
    },
    removed: function(doc){
      var temp = TempGuests.findOne({guestId: doc._id});
      TempGuests.remove(temp._id);
    }
  });
});