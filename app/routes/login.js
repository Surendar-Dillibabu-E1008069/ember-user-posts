import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    afterLoginTransition() {
      this.transitionTo('home');
    }
  },

  beforeModel() {
    let userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    if(userDetails != null && userDetails.userId != null && userDetails.userId != undefined) {
      this.transitionTo('home');
    }
  }
});
