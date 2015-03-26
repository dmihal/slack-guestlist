Router.configure({
  layoutTemplate: 'home'
});

Router.route('/', function(){
  this.redirect('/login');
});
Router.route('/login', function(){
  if (Meteor.user()){
    this.redirect('/lists');
  } else {
    this.render('loginButtons');
  }
});
Router.route('/lists', function(){
  this.render('allLists');
},{
  name: 'lists'
});
Router.route('/lists/:_id', function(){
  this.render('list', {
    data: function(){
      return Lists.findOne(this.params._id);
    }
  });
},{
  name: 'list.show'
});

Tracker.autorun(function(){
  if (!Meteor.user()){
    Router.go('/login');
  }
});
