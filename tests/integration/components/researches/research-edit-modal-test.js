import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('researches/research-edit-modal', 'Integration | Component | researches/research edit modal', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{researches/research-edit-modal}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#researches/research-edit-modal}}
      template block text
    {{/researches/research-edit-modal}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});