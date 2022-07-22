import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('signup', { path: '/users/new' });
  this.route('home');
  this.route('logout');
  this.route('user-details', { path: '/users/:user_id'});
  this.route('posts');
  this.route('post', { path: '/posts/new' });
  this.route('post-details', { path: '/posts/:post_id'});
  this.route('edit-post-details', { path: '/posts/:post_id/edit'});
  this.route('edit-user-details', { path: '/users/:user_id/edit'});
});

export default Router;
