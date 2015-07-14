Ext.define('addressbook.store.AddressBook', {
	extend: 'Ext.data.Store',
	model: 'addressbook.model.AddressBook',
	data: [
		{name:'smj', tel:'13581505368'},
		{name:'cy', tel:'15835354678'}
	]
})