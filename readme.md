- Tabs is a basic ui component, it is a list and each item is a tab
- Only one tab can be active
- One tab always associated with a content area(but not must)

Check `lib/tabs.js` for more info

# DOM Manipulate
- `new Tabs()` 
- `root`
- `length`
- `activeId`
- `active`
- `getID(tab)`
- `getAt(index)` 
- `getByID(id)` 
- `hasByID(id)`
- `add(innerHTML, [index], [id])`
- `removeByID(id)`
- `activateByID(id)` 

# CSS Selector Example
- `tabs` root element
- `tabs > tab` tab
- `tab[data-id=<id>]` tab has a id
- `tab[data-active=true]` tab is active
- `tab:not([data-active=true])` tab is inactive
