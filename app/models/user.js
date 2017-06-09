import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  researches: DS.hasMany('research'),
  quantums: DS.hasMany('quantums')
});
