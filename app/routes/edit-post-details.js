import Ember from 'ember';

export default Ember.Route.extend({

  async model(params) {

    let userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    let post = await fetch('http://localhost:3000/posts/'+params.post_id+"/edit.json?userId="+userDetails.userId, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    })
      .then(function(res){
        return res.json();
      })
      .then(function(data){
        return data;
      });

    if(post.errMsg != null && post.errMsg === "access_denied") {
      this.transitionTo('access-denied');
    } else {
      let responseData = {
        userDetails,
        post
      }

      return responseData;
    }
  },

  actions: {
    afterPostUpdateTransition(postId){
      this.transitionTo('post-details', postId);
    }
  }

});
