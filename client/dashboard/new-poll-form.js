var answers = new Mongo.Collection(null, {
  transform: function(doc){

    return doc;
  }
});
var resetAnswers = function(){
  answers.remove({});
  answers.insert({});
  answers.insert({});
}
resetAnswers();
var canRemove = function(){
  return answers.find().count() > 2;
}

Template.newPollForm.helpers({
  answers: function(){
    return answers.find();
  },
  canRemove: function(){
    return canRemove();
  }
});
Template.newPollForm.events({
  'submit form': function(e, template){
    var message = "Where should we go to lunch?\n" +
      "<http://www.foo.com|www.foo.com>";

    resetAnswers();
  },
  'click .remove': function(){
    if (canRemove()){
      answers.remove(this._id);
    }
  },
  'click .addAnswer': function(){
    answers.insert({});
  }
});
