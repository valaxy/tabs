"use strict";

var $ = require('jquery')

module.exports = class {

	constructor() {
		this._idCounter = 0
		this._root = document.createElement('tabs')
	}

	get root() {
		return this._root
	}

	get $root() {
		return $(this.root)
	}

	get length() {
		return this.$root.find('>tab').length
	}


	/** Add a tab
	 ** return: id of the tab
	 */
	add(tabContent, index) {
		var $tab = $('<tab>')

		if (typeof index == 'undefined') {
			this.$dom.append($tab)
		} else if (index > 0) {
			this.getAt(index - 1).after($tab)
		} else {
			this.getAt(0).before($tab)
		}
		if (this.length == 1) {
			this.active(this.getAt(0))
		}

		return this._idCounter++
	}

	remove($tab) {
		var prevTab = $tab[0].previousElementSibling
		if (prevTab) {
			$tab.remove()
			if (this.getActive().length == 0) {
				this.active($(prevTab))
			}
		} else {
			var $parent = $tab.parent()
			$tab.remove()
			if (this.getActive().length == 0) {
				this.active($($parent[0].firstChild))
			}
		}
		return this
	}


	getAt(index) {
		return this.$dom.find('>tab:nth-of-type(' + (index + 1) + ')')
	}


	get active() {
		return this.$dom.find('>tab[active]')
	}

	set active($tab) {
		this.$dom.find('>tab').removeAttr('active')
		$tab.attr('active', '')
		return this
	}
}