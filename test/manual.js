var Tabs = require('../lib/tabs'),
    $    = require('jquery')

var tabs = new Tabs
tabs.add('<p>1</p>')
tabs.add('<p>2</p>')
tabs.add('<p>3</p>');

$(tabs.root).on('click', '> tab', (e) => {
	tabs.activateByID($(e.currentTarget).attr('data-id'))
})

document.body.appendChild(tabs.root)