import Ember from 'ember';

export default Ember.Route.extend({

  async beforeModel() {
    this.transitionTo('login');
  }
});
