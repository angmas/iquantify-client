import Ember from 'ember';

export default Ember.Component.extend({
  newResearch: {
    title: null,
    description: null,
    directions: null,
    announcement: {
      message: null
    }
  },
  actions: {
    closeModal() {
      this.toggleProperty('modal');
      this.$('form').trigger('reset');
      // // console.log('closeModal this: ', this)
    },
    createResearch() {
      // // console.log('modal newResearch: ', this.get('newResearch'));
      return this.sendAction('createResearch', this.get('newResearch'));
    }
  },
});
