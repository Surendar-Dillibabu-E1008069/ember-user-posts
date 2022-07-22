import Ember from 'ember';

const {
  Component,
  get,
  set
} = Ember;

export default Component.extend({
  tagName:'',
  title: null,
  content: null,
  postId: null,
  errMsg: null,
  userDetails: null,

  init: function() {
    this._super();
    if(this.post) {
      this.title = this.post.title;
      this.content = this.post.content;
      this.postId = this.post.id;
    }
  },

  isFormValid: function() {
    if(this.title == null || this.title.trim().length <= 0) {
      set(this, 'errMsg', 'Title is mandatory');
    } else if(this.content == null || this.content.trim().length <= 0) {
      set(this, 'errMsg', 'Content is mandatory');
    } else if(this.content.trim().length < 10 || this.content.trim().length >= 400) {
      set(this, 'errMsg', 'Content should contain minimum 10 characters and maximum 400 characters');
    } else {
      return true;
    }
    return false;
  },

  actions: {
    createOrUpdatePost() {
      if(this.isFormValid()) {
        set(this, 'errMsg', null);
        let postId = get(this, 'postId');
        let data = { "title": this.title, "content": this.content, "user_id": get(this, 'userDetails').userId };
        let url = "http://localhost:3000/posts.json";
        if(postId != null) {
          url = "http://localhost:3000/posts/"+postId+".json";
        }
        fetch(url, {
          method: (postId != null ? "PUT" : "POST"),
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        })
          .then(function(res){ return res.json(); })
          .then(function(data){
            if(data.succMsg != null) {
              if(postId != null) {
                this.afterPostUpdateTransition(postId);
              } else {
                this.afterPostCreateTransition();
              }
            } else if(data.errMsg != null) {
              set(this, 'errMsg', data.errMsg);
            }
          }.bind(this));
      }
    }
  }

});
