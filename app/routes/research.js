import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.get('store').findRecord('research', params.research_id);
  },
  actions: {
    createQuantum(quantum) {
      let quantumRecord = this.get('store').createRecord('quantum', quantum);
      quantumRecord.save()
      .then(()=> {
        let researchRecord = this.get('store').findRecord('research', quantum.research.id)
        this.refresh()
      })
      .then(()=> {
        this.transitionTo('research')
      })

    }
  }
});
