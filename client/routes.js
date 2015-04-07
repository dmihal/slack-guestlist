var originalDestination = null;

Router.configure({
  layoutTemplate: 'home'
});

Router.route('/', function(){
  this.redirect('/login');
});
Router.route('/login', function(){
  if (Meteor.user()){
    var redirect = '/lists';
    if (originalDestination){
      redirect = originalDestination;
      originalDestination = null;
    }
    this.redirect(redirect);
  } else {
    this.render('loginButtons');
  }
});
Router.route('/lists', function(){
  this.render('allLists');
},{
  name: 'lists'
});
Router.route('/new-widget', function(){
  this.render('newWidget');
},{
  name: 'new-widget'
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
    originalDestination = location.pathname;
    Router.go('/login');
  }
});
