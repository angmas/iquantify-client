import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').find('research');
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
