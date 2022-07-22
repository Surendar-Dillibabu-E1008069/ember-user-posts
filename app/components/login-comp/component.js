import Ember from 'ember';

const {
  Component,
  get,
  set
} = Ember;

export default Component.extend({
  tagName:'',
  email: null,
  password: null,
  notice: null,

  actions: {
    login() {
      if(this.email == null || this.email.trim().length <= 0 ||
        this.password == null || this.password.trim().length <= 0) {
        set(this, 'notice', 'Please provide the email and password');
      } else {
        let data = { "email": this.email, "password": this.password };
        fetch("http://localhost:3000/login.json", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        })
          .then(function(res){ return res.json(); })
          .then(function(data){
            if(data.errMsg != null) {
              set(this, 'notice', data.errMsg);
            } else if (data.succMsg != null) {
              let userDetails = { "userId": data.userId, "firstName": data.firstName };
              sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
              this.afterLoginTransition();
            }
          }.bind(this));
      }
    }
  }

});
