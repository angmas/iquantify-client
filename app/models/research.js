import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  directions: DS.attr('string'),
  announcement: DS.attr(),
  hide: DS.attr('boolean'),
  editable: DS.attr('boolean'),
  createdAt: DS.attr(),
  updatedAt: DS.attr(),
  user: DS.belongsTo('user'),
  quantums: DS.hasMany('quantum')
});
