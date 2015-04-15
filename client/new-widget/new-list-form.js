Template.newListForm.events({
  'submit form': function (e, template) {
    e.preventDefault();

    var user = Meteor.user();
    var channel = template.find('select').value;
    var numGuests = template.find('#numGuests').value;
    var title = template.find('#title').value;
    var id = Lists.insert({
      type: 'list',
      title: title,
      eventDate: null,
      closes: null,
      owner: user._id,
      channel: channel,
      group: user.profile.team_id,
      limit: {
        type: "user",
        guestsPerUser: numGuests
      }
    });

    var listURL = Router.url("list.show", {_id: id});
    var slackMessage = "@" + user.profile.name + " has created a new guest list called \"" + 
       title + "\". " +
      "Edit the list at " + listURL;
    Slack.channels(channel).postMessage(slackMessage,{
      username: "SlackApps"
    });

    Router.go('list.show', {_id: id});
  }
});
