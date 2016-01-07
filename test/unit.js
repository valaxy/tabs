var Tabs = require('../lib/tabs')


QUnit.module('Tabs')


QUnit.test('root/length/hasByID()/add()', function (assert) {
	var tabs = new Tabs

	// empty
	assert.equal(tabs.root.tagName, 'TABS')
	assert.equal(tabs.length, 0)
	assert.ok(!tabs.hasByID(1))


	// append
	assert.equal(tabs.add('<p>1</p>'), 1)
	assert.equal(tabs.length, 1)
	assert.ok(tabs.hasByID(1))

	// append
	assert.equal(tabs.add('<p>2</p>'), 2)
	assert.equal(tabs.length, 2)

	// insert
	assert.equal(tabs.add('<p>3</p>', 0), 3)
	assert.equal(tabs.length, 3)
})


QUnit.test('getAt()/getByID()/removeByID()', function (assert) {
	var tabs = new Tabs
	tabs.add('<p>0</p>')
	tabs.add('<p>1</p>')
	tabs.add('<p>2</p>')

	assert.equal(tabs.getAt(4), null)
	assert.equal(tabs.getAt(1).innerText, 1)

	assert.equal(tabs.getByID(5), null)
	assert.equal(tabs.getByID(2).innerText, 1)

	tabs.removeByID(2)
	assert.equal(tabs.length, 2)
})


QUnit.test('activeId/active/activeByID()', function (assert) {
	var tabs = new Tabs
	tabs.add('<p>1</p>')
	tabs.add('<p>2</p>')
	tabs.add('<p>3</p>')

	assert.equal(tabs.activeId, null)
	assert.equal(tabs.active, null)

	tabs.activeByID(2)
	assert.equal(tabs.activeId, 2)
	assert.equal(tabs.active.innerText, 2)
})