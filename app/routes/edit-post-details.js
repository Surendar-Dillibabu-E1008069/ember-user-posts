import Ember from 'ember';

export default Ember.Route.extend({

  async model(params) {

    let userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    let post = await fetch('http://localhost:3000/posts/'+params.post_id+".json", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    })
      .then(function(res){
        return res.json();
      })
      .then(function(data){
        return data;
      });

    let responseData = {
      userDetails,
      post
    }

    return responseData;
  },

  actions: {
    afterPostUpdateTransition(postId){
      this.transitionTo('post-details', postId);
    }
  }

});
