import Ember from 'ember';

export default Ember.Route.extend({

  async beforeModel() {
    sessionStorage.removeItem('userDetails');
    this.transitionTo('login');
  }
});
