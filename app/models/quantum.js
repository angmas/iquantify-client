import DS from 'ember-data';

export default DS.Model.extend({
  count: DS.attr('string'),
  longitude: DS.attr('number'),
  latitude: DS.attr('number'),
  research: DS.belongsTo('research'),
  user: DS.belongsTo('user')
});
