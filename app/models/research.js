import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  directions: DS.attr('string'),
  announcement: DS.attr(),
  hide: DS.attr('boolean'),
  createdAt: DS.attr('string'),
  updatedAt: DS.attr('string'),
  user: DS.belongsTo('user'),
});
