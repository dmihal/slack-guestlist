Session.setDefault('currentList', null);

Template.registerHelper('currentList', function(){
  return Session.get('currentList');
});