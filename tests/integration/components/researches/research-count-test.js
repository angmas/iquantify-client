import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('researches/research-count', 'Integration | Component | researches/research count', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{researches/research-count}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#researches/research-count}}
      template block text
    {{/researches/research-count}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
