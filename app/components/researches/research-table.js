import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    researchDelete(research) {
      // console.log('in research-table,js researchDelete research: ', research);
      return this.sendAction('researchDelete', research);
    },
    goToResearchEdit(research) {
      this.sendAction('goToResearchEdit', research)
    }
  },
});
