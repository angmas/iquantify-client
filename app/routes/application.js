import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  actions: {
    signOut () {
      this.get('auth').signOut()
        .then(() => this.get('store').unloadAll())
        .then(() => this.transitionTo('index'))
        .then(() => {
          this.get('flashMessages').warning('You have been signed out.');
        })
        .catch(() => {
          this.get('flashMessages')
          .danger('There was an unexpected problem. You have been signed out.');
        })
        .then(()=> {
          this.transitionTo('index');
        })
    },

    error (reason) {
      let unauthorized = reason.errors && reason.errors.some((error) =>
        error.status === '401'
      );

      if (unauthorized) {
        this.get('flashMessages')
        .danger('You must be authenticated to access this page.');
        this.transitionTo('/sign-in');
      } else {
        this.get('flashMessages')
        .danger('There was a problem. Please try again.');
      }

      return false;
    },
  },
});
