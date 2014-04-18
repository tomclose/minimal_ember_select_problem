App = Ember.Application.create({});

App.Router.map(function() {
  this.resource('posts', { path: '/'} );
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('post');
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    this.controllerFor('authors').set('model', this.store.find('author'));
  }
});

App.Post = DS.Model.extend({
  title:  DS.attr('string'),
  author: DS.belongsTo('author'),
});

App.Author = DS.Model.extend({
  name: DS.attr('string'),
});

App.AuthorsController = Ember.ArrayController.extend();

App.PostController = Ember.ObjectController.extend({
  needs: ['authors'],
  // authors: Ember.computed.alias('controllers.authors'),
  authors: function() {
    return Em.A([this.store.find('author', 2), this.store.find('author', 1)]);
    // return Em.A([]);
  }.property('controllers.authors'), 

  names: ["Tom", "Bob"]
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

var posts = [
  { id: '1', title: 'First post', author: '1'},
  { id: '2', title: 'Second post', author: '2'}
];
App.Post.FIXTURES = posts;

var authors = [
  {id: '1', name: 'Alice'},
  {id: '2', name: 'Bob'},
];
App.Author.FIXTURES = authors;