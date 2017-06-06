import { ActiveModelSerializer } from 'active-model-adapter';

export default ActiveModelSerializer.extend({
  keyForAttribute: function(attr) {
      return attr;
  }
});
