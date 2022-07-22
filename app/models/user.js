import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  userId: attr('number'),
  first_name: attr('string'),
  last_name: attr('string'),
  email: attr('string'),
  password: attr('string')
});
