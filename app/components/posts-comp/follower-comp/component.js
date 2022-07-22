import Ember from 'ember';

const {
  Component,
  get,
  set
} = Ember;

export default Component.extend({
  tagName:'',
  isFollowed: false,

  init: function() {
    this._super();
    this.isFollowed = (this.followers_list != undefined && this.followers_list.includes(this.user.id));
  },

  actions: {
    followOrUnfollowUser(userId, unFollowerFlag) {
      let url = 'http://localhost:3000/follow.json?follower_user_id='+userId+"&userId="+this.userId;
      if(unFollowerFlag) {
        url = 'http://localhost:3000/unfollow.json?follower_user_id='+userId+"&userId="+this.userId;
      }
      fetch(url)
        .then(function(res){ return res.json(); })
        .then(function(data) {
          if(data.succMsg != null) {
            set(this, 'isFollowed', (unFollowerFlag ? false : true));
            window.location.reload(true);
          }
        }.bind(this));
    }
  }

});
