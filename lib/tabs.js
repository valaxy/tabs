"use strict";

module.exports = class {
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

	/** get tab by index */
	getAt(index) {
		return this.root.querySelector('tab:nth-of-type(' + (index + 1) + ')')
	}


	/** get tab by ID */
	getByID(id) {
		return this.root.querySelector('tab[data-id="' + id + '"]')
	}

	/** Add a tab
	 ** return: id of the tab
	 */
	add(innerHTML, index) {
		var id = ++this._idCounter
		var tab = document.createElement('tab')
		tab.innerHTML = innerHTML
		tab.setAttribute('data-id', id)

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
		if (this.activeId == id) this.activeByID(null)
		return this
	}


	/** active a tab by ID */
	activeByID(id) {
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