"use strict";

const TAB_TAG_NAME = 'tab'
const ID_ATTRIBUTE = 'data-id'

module.exports = class Tabs {
	constructor() {
		this._idCounter = 0
		this._root = document.createElement('tabs')
		this._activeId = null
	}

	/** root element */
	get root() {
		return this._root
	}

	/** count of tab */
	get length() {
		return this.root.childElementCount
	}

	/** id of active tab */
	get activeId() {
		return this._activeId
	}

	/** the active tab */
	get active() {
		return this.getByID(this.activeId)
	}

	/** get ID of tab element */
	getID(tab) {
		return tab.getAttribute(ID_ATTRIBUTE)
	}

	/** get tab by index */
	getAt(index) {
		return this.root.querySelector('tab:nth-of-type(' + (index + 1) + ')')
	}


	/** get tab by ID */
	getByID(id) {
		return this.root.querySelector('tab[' + ID_ATTRIBUTE + '="' + id + '"]')
	}

	/** has tab by ID */
	hasByID(id) {
		return this.getByID(id) != null
	}

	/** Add a tab
	 ** index: >= 0 or undefined
	 ** return: id of the tab
	 */
	add(innerHTML, index, id) {
		id = typeof id == 'undefined' ? ++this._idCounter : id
		var tab = document.createElement(TAB_TAG_NAME)
		tab.innerHTML = innerHTML
		tab.setAttribute(ID_ATTRIBUTE, id)

		if (typeof index == 'undefined' || index >= this.length) {
			this.root.appendChild(tab)
		} else { // if (index >= 0)
			var subTab = this.getAt(index)
			this.root.insertBefore(tab, subTab)
		}

		return id
	}

	/** remote tab by ID */
	removeByID(id) {
		var tab = this.getByID(id)
		tab.remove()
		if (this.activeId == id) this.activateByID(null)
		return this
	}


	/** active a tab by ID */
	activateByID(id) {
		if (id === null) {
			var prevActive = this.active
			this._activeId = null
			prevActive !== null && prevActive.removeAttribute('data-active')
			return this
		}

		prevActive = this.active
		var nextActive = this.getByID(id)
		if (nextActive === null) return

		prevActive !== null && prevActive.removeAttribute('data-active')
		this._activeId = id
		nextActive.setAttribute('data-active', true)
		return this
	}
}