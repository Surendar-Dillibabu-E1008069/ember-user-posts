import Ember from 'ember';

export default Ember.Route.extend({

  async model() {
    let userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    let postsData = await fetch("http://localhost:3000/posts.json?userId="+userDetails.userId, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    })
      .then(function(res){
        return res.json();
      })
      .then(function(data){
        return data
      });
    let responseData = {
      response: postsData,
      userDetails
    }

    return responseData;
  }

});
