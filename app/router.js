import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function () {
  this.route('sign-up');
  this.route('sign-in');
  this.route('change-password');
  this.route('users');
  this.route('researches', function() {
    this.route('research-edit', { path:'/:research_id'});
  });

  this.route('research', {path: 'research/:research_id'}, function() {});
});

export default Router;
