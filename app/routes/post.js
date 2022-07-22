import Ember from 'ember';

export default Ember.Route.extend({

  async model() {
    return JSON.parse(sessionStorage.getItem('userDetails'));
  },

  actions: {
    afterPostCreateTransition() {
      this.transitionTo('posts');
    }
  }
});
