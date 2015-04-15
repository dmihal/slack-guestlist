var originalDestination = null;

Router.configure({
  layoutTemplate: 'home'
});

var ensureLoggedIn = function(){
  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.redirect('/login');
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.next();
  }
};

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
    this.render('login');
  }
});
Router.route('/lists', function(){
  this.render('allLists');
},{
  name: 'lists',
  onBeforeAction: ensureLoggedIn
});
Router.route('/new-widget', function(){
  this.render('newWidget');
},{
  name: 'new-widget',
  onBeforeAction: ensureLoggedIn
});
Router.route('/lists/:_id', function(){
  this.render('list', {
    data: function(){
      return Lists.findOne(this.params._id);
    }
  });
},{
  name: 'list.show',
  onBeforeAction: ensureLoggedIn
});

Tracker.autorun(function(){
  if (!Meteor.user()){
    originalDestination = location.pathname;
    Router.go('/login');
  } else {
    var url;
    Tracker.nonreactive(function(){
      url = Router.current().url;
    });
    if (url == "/login"){
      Router.go('/lists');
    }
  }
});
