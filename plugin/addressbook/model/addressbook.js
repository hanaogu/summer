Ext.define('addressbook.model.AddressBook', {
	extend: 'Ext.data.Model',
	fields: [
		{
			name: 'name',
			type: 'string'
		},
		{
			name: 'tel',
			type: 'string'
		}
	]
})