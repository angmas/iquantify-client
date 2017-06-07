import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
      researchDelete () {
        // console.log('research-list this: ', this.get('research') );
        return this.sendAction('researchDelete', this.get('research'));

      }
    },
});
