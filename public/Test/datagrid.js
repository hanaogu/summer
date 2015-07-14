Ext.create('Summer.view.DataGrid', {
  title: 'DataGrid',
  sdata: Ext.create('Summer.data.Data', {
    dataUrl: 'Test/grid.json',
    fields: ['id', {name:'workCode', type: 'string'}, 'userName', 'privMail', 'sex', 'mobile', 'dep', 'duty', 'telb', 'pinyin', 'photoGroupid', 'headPortrait', 'updateTime'],
  }),
  columns: [
    {
      xtype: 'rownumberer',
      header: '序号',
      align: 'center',
      width: 60
    },
    {
      header: '工号',
      dataIndex: 'workCode',
      align: 'center',
      menuDisabled: false
    },
    {
      header: '姓名',
      dataIndex: 'userName',
      align: 'center',
      menuDisabled: false,
      editor: 'textfield'
    },
    {
      header: '部门',
      dataIndex: 'dep',
      align: 'center',
      menuDisabled: false,
      width: 100,
    },
    {
      header: '职位',
      dataIndex: 'duty',
      align: 'center',
      menuDisabled: true,
    },
  ],
})
