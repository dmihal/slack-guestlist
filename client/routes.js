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
    this.render('login');
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
