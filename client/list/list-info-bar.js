Template.listInfoBar.helpers({
  date: function(){
    var dateStr = "No date set";
    if (this.date){
      var mDate = moment(this.date);
      if (mDate.hour() === 0 && mDate.minute() === 0){
        dateStr = mDate.format("dddd, MMMM Do YYYY");
      } else {
        dateStr = mDate.format("dddd, MMMM Do YYYY, h:mm:ss a");
      }
    }
    return dateStr;
  }
});
