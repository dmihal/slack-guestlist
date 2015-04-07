var widgetType = new ReactiveVar(null);

Template.newWidget.helpers({
  type: function(){
    return widgetType.get();
  }
});
Template.newWidget.events({
  'change input': function(e, template){
    var selected = template.find('input:checked');
    widgetType.set(selected ? selected.value : null);
  }
});
