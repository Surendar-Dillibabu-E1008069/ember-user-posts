import Ember from 'ember';

export function subStringHelper(params) {
  let content = params[0];
  let size = params[1];

  if(content.length > size) {
    return content.substring(0, size).concat('...');
  }
  return content;
}

export default Ember.Helper.helper(subStringHelper);
