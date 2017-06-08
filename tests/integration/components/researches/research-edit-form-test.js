import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('researches/research-edit-form', 'Integration | Component | researches/research edit form', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{researches/research-edit-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#researches/research-edit-form}}
      template block text
    {{/researches/research-edit-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
