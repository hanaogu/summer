Ext.define('addressbook.view.AddressBookPanel', {
	extend: 'Ext.grid.Panel',
	title: 'addressBook',
	store: Ext.create('addressbook.store.AddressBook'),
	columns: [
		{
			text: '姓名',
			flex: 1,
			sortable: false,
			dataIndex: 'name'
		},
		{
			text: '电话',
			width: 95,
			sortable: true,
			dataIndex: 'tel'
		}
	]
})