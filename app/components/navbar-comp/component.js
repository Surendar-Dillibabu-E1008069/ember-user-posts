import Ember from 'ember';

const {
  Component,
  get,
  set
} = Ember;

export default Component.extend({
  tagName:'',
  isLoggedIn: true,

  init: function() {
    this._super();
    let userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    set(this, 'isLoggedIn', (userDetails != null && userDetails.userId != null && userDetails.userId != undefined));
  },

  actions: {
    logout() {
      set(this, 'isLoggedIn', false);
    }
  }
});
