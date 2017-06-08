import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    goToResearches() {
      this.sendAction('goToResearches');
    },
    editResearch() {
      this.sendAction('editResearch', this.get('research'));
    }
  }
});
