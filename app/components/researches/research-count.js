import Ember from 'ember';

export default Ember.Component.extend({
  quantumPlusOne: {
    count: 1
  },
  quantumMinusOne: {
    count: -1
  },
  actions: {
    createQuantumPlusOne() {
      let data = this.get('quantumPlusOne');
      data.research = this.get('research');
      this.sendAction('createQuantum', data);
    },
    createQuantumMinusOne() {
      let data = this.get('quantumMinusOne');
      data.research = this.get('research');
      this.sendAction('createQuantum', data);
    }
  }
});
