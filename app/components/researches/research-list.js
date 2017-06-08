import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  actions: {
      researchDelete () {
        // console.log('research-list this: ', this.get('research') );
        return this.sendAction('researchDelete', this.get('research'));

      },
      goToResearchEdit () {
        this.sendAction('goToResearchEdit', this.get('research'));
      }
    },
});
