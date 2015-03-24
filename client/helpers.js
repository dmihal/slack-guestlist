Template.registerHelper('not', function(value){
  return !value;
});
Template.registerHelper('conditional', function(condition, value, falseValue){
  return condition ? value : falseValue;
});
