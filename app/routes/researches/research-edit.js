import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    // console.log('route research-edit params: ', params);
    return this.get('store').findRecord('research', params.research_id);
  },
  flashMessages: Ember.inject.service(),
  actions: {
    goToResearches() {
      this.transitionTo('researches');
    },
    editResearch(research) {
      if (!research.get('title')) {
        this.get('flashMessages')
        .danger('Title is required!')
      } else {
        research.save()
        .then(()=> {
          this.transitionTo('researches')
        })
        .catch(() => {
          this.get('flashMessages')
          .danger('There was a problem. Please try again')
        })
    }
    }
  }
});
