import Ember from 'ember';

export default Ember.Route.extend({

  async model(params) {
    let userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    let user = await fetch('http://localhost:3000/users/'+userDetails.userId+".json", {
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
      user
    }

    return responseData;
  },

  actions: {
    afterUserUpdateTransition(userId){
      this.transitionTo('user-details', userId);
    }
  }

});
