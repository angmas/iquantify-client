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
    closeModal(){
      this.set('newResearch.title', null)
      console.log('closeModal newResearch: ', this.get(newResearch))
    },
    createResearch(research) {
      console.log('modal newResearch: ', this.get('newResearch'));
      return this.sendAction('createResearch', this.get('newResearch'));
    }
  },
});
