import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('research');
  },
  actions: {
    researchDelete(research) {
      // console.log('Delete action on top research: ', research);
      research.destroyRecord();
    },
    createResearch(research) {
      console.log('list createItem data: ', research);
      let researchRecord = this.get('store').createRecord('research', research);
      researchRecord.save()
      .then(() => {
        Ember.$('.modal').modal('hide');
        Ember.$('form').trigger('reset');
      })
      .catch();
    },
    goToResearchEdit(research) {
      this.transitionTo('researches.research-edit',research)
    }
},
});
