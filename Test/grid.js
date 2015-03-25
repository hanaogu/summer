Ext.create('Summer.view.Grid', {
  title:'Grid封装测试',
  dataUrl: 'http://localhost/erpos22/php/gridajax.php?action=data',
  fields:['id','user','name','sex','tel','email','optdt','deptid','deptname','birth'],
  pageSize: 3,
  toolbar:[{top:'true'},{bottom:'true'},],
  scolumns: [
	{name: '工号', field: 'user', align: 'center', sortgrid:true, edit:'textfield', flex:1},
	{name: '姓名', field: 'name', width: 65, align: 'left',edit:'datefield',formattime: 'm d Y',},
	{name: 'Email', field: 'email', align: 'right', sortgrid:true, width: 100,}
  ]
})
