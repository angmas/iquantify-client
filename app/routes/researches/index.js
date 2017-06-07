import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('research');
  },
  actions: {
    researchDelete(research) {
      // console.log('Delete action on top research: ', research);
      research.destroyRecord();
    },
    // createItem(data) {
    //   console.log('list createItem data: ', data);
    //   let itemRecord = this.get('store').createRecord('item', data);
    //   itemRecord.save();
    // }
},
});
