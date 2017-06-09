import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    // console.log('route research-edit params: ', params);
    return this.get('store').findRecord('research', params.research_id);
  },
  actions: {
    goToResearches() {
      this.transitionTo('researches');
    },
    editResearch(research) {
      research.save()
      .then(()=> {
        this.transitionTo('researches')
      })
      .catch()
    }
  }
});
