import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  tagName:'',
  post: null,
  isPostEditable: false,

  init: function() {
    this._super();
    this.isPostEditable = (this.post.user_id === this.userDetails.userId);
  }

});
