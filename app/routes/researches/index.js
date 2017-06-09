import Ember from 'ember';

export default Ember.Route.extend({
  flashMessages: Ember.inject.service(),
  model () {
    return this.get('store').findAll('research');
  },
  actions: {
    researchDelete(research) {
      // // console.log('Delete action on top research: ', research);
      research.destroyRecord()
      .catch(() => {
        this.get('flashMessages')
        .danger('There was a problem. Please try again.');
      });
    },
    createResearch(research) {
      // console.log('list createItem data: ', research.title);
      if (!research.title) {
        this.get('flashMessages')
        .danger('Title is required!')
      } else {
        let researchRecord = this.get('store').createRecord('research', research);
        researchRecord.save()
          .then(() => {
            Ember.$('.modal').modal('hide');
            Ember.$('form').trigger('reset');
          })
          .catch(() => {
            this.get('flashMessages')
            .danger('There was a problem. Please try again.');
          });
        }
    },
    goToResearchEdit(research) {
      this.transitionTo('researches.research-edit',research)
    },
    goToResearch(research) {
      this.transitionTo('research',research)
    }
},
});
