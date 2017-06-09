import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.get('store').findRecord('research', params.research_id);
  },
  actions: {
    createQuantum(quantum) {
      console.log('research quantum: ', quantum);
      let quantumRecord = this.get('store').createRecord('quantum', quantum);
      quantumRecord.save();
    }
  }
});
