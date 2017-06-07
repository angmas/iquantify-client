import Ember from 'ember';

export default Ember.Component.extend({
  newResearch: {
    title: null,
    description: false,
    directions: null,
    announcement: {
      message: null
    }
  },
  actions: {
    closeModal(newResearch) {
      this.toggleProperty('modal');
      this.$('form').trigger('reset');
      // console.log('closeModal this: ', this)
    },
    createResearch(research) {
      // console.log('modal newResearch: ', this.get('newResearch'));
      return this.sendAction('createResearch', this.get('newResearch'));
    }
  },
});
