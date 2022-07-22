import Ember from 'ember';

const {
  Component,
  get,
  set
} = Ember;

export default Component.extend({
  tagName:'',
  userId: null,
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  passwordConfirmation: null,
  errMsg: null,
  notice: null,

  init: function() {
    this._super();
    if(this.user) {
      this.userId = this.user.id;
      this.firstName = this.user.first_name;
      this.lastName = this.user.last_name;
      this.email = this.user.email;
      this.password = this.user.password;
      this.passwordConfirmation = this.user.password;
    }
  },

  isUserFormValid: function() {
    if(this.firstName == null || this.firstName.trim().length <= 0) {
      set(this, 'errMsg', 'First name is mandatory');
    } else if(this.lastName == null || this.lastName.trim().length <= 0) {
      set(this, 'errMsg', 'Last name is mandatory');
    }  else if(this.email == null || this.email.trim().length <= 0) {
      set(this, 'errMsg', 'Email is mandatory');
    } else if(/\S+@\S+\.\S+/.test(this.email) == false) {
      set(this, 'errMsg', 'Please provide valid email');
    } else if (this.password == null || this.password.trim().length <= 0) {
      set(this, 'errMsg', 'Password is mandatory');
    } else if (this.password.length < 6 || this.password.length > 20) {
      set(this, 'errMsg', 'Password should contain minimum 6 character and maximum 20 characters');
    } else if (this.passwordConfirmation == null || this.passwordConfirmation.trim().length <= 0) {
      set(this, 'errMsg', 'Password confirmation is mandatory');
    } else if (this.password != this.passwordConfirmation) {
      set(this, 'errMsg', 'Password and password confirmation is mismatched');
    } else {
      return true;
    }
    return false;
  },

  actions: {
    createOrUpdateUser() {
      if(this.isUserFormValid()) {
        set(this, 'errMsg', null);
        let data = {
          "first_name": this.firstName,
          "last_name": this.lastName,
          "email": this.email,
          "password": this.password,
          "password_confirmation": this.passwordConfirmation
        };
        let url = "http://localhost:3000/users.json";
        let userId = get(this, 'userId');
        if(userId != null) {
          url = "http://localhost:3000/users/"+userId+".json";
        }
        fetch(url, {
          method: (userId != null ? "PUT" : "POST"),
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        })
          .then(function(res){ return res.json(); })
          .then(function(data){
            if(data.succMsg != null) {
              if(userId != null) {
                this.afterUserUpdateTransition(userId);
              }else {
                set(this, 'notice', data.succMsg);
                set(this, 'firstName', null);
                set(this, 'lastName', null);
                set(this, 'email', null);
                set(this, 'password', null);
                set(this, 'passwordConfirmation', null);
              }
            } else if(data.errMsg != null) {
              set(this, 'errMsg', data.errMsg);
            }
          }.bind(this));
      }
    }
  }
});
