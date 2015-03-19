//定义Ext.wd.grid 方法

Ext.define('Summer.view.grid',{
	extend: 'Ext.grid.Panel',	//继承
	region:'center',
	onDestroy:function(){
		Ext.destroy(this.win);
		this.callParent();
	},
	initComponent: function(){
		var me = this;
		me.store = me._createstore();
		Ext.applyIf(me, {
			tbar:[{
				xtype:'textfield',
				emptyText:'姓名/电话/邮箱',
				itemId:'name'
			},{
				text:'查询',
				icon:'images/zoom.png',
				handler:function(){
					var na = me.down('#name').getValue();
					if(na==null)na='';
					me.store.proxy.extraParams.name=na;
					me.store.reload();
				}
			},'->',{
				text:'新增',icon:'images/add.png',handler:function(){me._clickadd()}
			},'-',{
				text:'编辑',icon:'images/edit.png',disabled:true,handler:function(){me._clickedit()},itemId:'edit'
			},'-',{
				text:'删除',icon:'images/delete.png',disabled:true,handler:function(){me._clickdel()},itemId:'del'
			}],
			columns:[
			  { xtype: 'rownumberer', header:'序号', align:'center', width: 60
			},{
				header:'工号',dataIndex:'workCode',align:'center',
			},{
				header:'姓名',dataIndex:'userName',align:'center',editor:'textfield'
			},{
				header:'部门',dataIndex:'dep',align:'center',width:100,
			},{
				header:'职位',dataIndex:'duty',align:'center',
			},{
				header:'性别',dataIndex:'sex',align:'center',editor:'textfield'
			},{
				header:'分机',dataIndex: 'telb',align:'center',
            },{
				header:'手机号',dataIndex:'mobile',align:'center',editor:'textfield'
			},{
				header:'邮箱',dataIndex:'privMail',align:'center',width:160
			},{
				header:'pinyin',dataIndex:'pinyin',align:'center',editor:'textfield'
			},{
				header:'photoGroupid',dataIndex:'photoGroupid',align:'center',editor:'textfield'
			},{
				header:'headPortrait',dataIndex:'headPortrait',align:'center',editor:'textfield'
			},{
				header:'updateTime',dataIndex:'updateTime',align:'center',editor:'textfield'
			}],

			selModel:Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE"}),//复选框
			store:me.store,
			plugins:[Ext.create('Ext.grid.plugin.CellEditing')],
			bbar:Ext.create('Ext.PagingToolbar', {
				store:me.store,
				displayInfo: true,
				displayMsg: '显示第{0} - {1}条记录 / 共{2}记录',
				emptyMsg: "没有记录"
			}),
			listeners:{
				itemclick:function(o, a){
					me.changeobj  = a; //记录选中行
					me.down('#edit').setDisabled(false);
					me.down('#del').setDisabled(false);
				},
				beforeedit:function(editor, e){
					me.oldvalue = e.record.data[e.field];
					if(me.oldvalue==null)me.oldvalue='';
				},
				edit:function(editor, e){
					me._saveedit(e);//保存编辑
				}
			},
			viewConfig: {
				enableTextSelection: true,//可以选择行
				loadMask:true
			}
		});
		this.callParent();
	},

	_createstore:function(){
		var me = this;
		var store = Ext.create('Ext.data.Store', {
			pageSize:10, //分页数
			fields:['id','workCode','userName','privMail','sex','mobile','dep','duty','telb','pinyin','photoGroupid','headPortrait','updateTime'], //列字段
			remoteSort: true, //请求排序
			autoLoad :true,//字段加载
			proxy: {
				type: 'ajax',
				url:'data/grid.json',
				actionMethods:{read : 'GET'},
				extraParams:{}, //参数
				timeout:1200000,
				reader: {
					type: 'json',
					root: 'data',
					totalProperty: 'total'
				},
				simpleSortMode: true
			},
			listeners:{
				beforeload:function(){
					//按钮让变灰
					try{
						me.down('#edit').setDisabled(true);
						me.down('#del').setDisabled(true);
					}catch(e){}
				}
			}
		});
		return store;
	},

	_saveedit:function(e){
		var val = e.value;
		if(val==null)val='';
		if(val==this.oldvalue)return;
		var field = e.field;
		var data  = {field:field,value:val,id:e.record.data.id};
		$.post('php/gridajax.php?action=saverow', data, function(){
			Ext.example.msg('提示', '保存成功');
		});
	},

	//新增
	_clickadd:function(){
		this._window();
		this.win.setTitle('新增');
		this.form.reset();
		this.win.down('#msg').setText('');
	},

	//编辑
	_clickedit:function(){
		this._window();
		this.win.setTitle('编辑');
		var changedata = this.changeobj.data;
		this.form.findField('id').setValue(changedata.id);
		this.form.findField('user').setValue(changedata.user);
		this.form.findField('name').setValue(changedata.name);
		this.form.findField('sex').setValue(changedata.sex);
		this.form.findField('tel').setValue(changedata.tel);
		this.form.findField('birth').setValue(changedata.birth);
		this.form.findField('email').setValue(changedata.email);
		this.form.findField('deptid').setValue(changedata.deptid);
		this.win.down('#msg').setText('');
	},

	//删除
	_clickdel:function(){
		var me = this;
		Ext.MessageBox.confirm('系统提示', '确定要删除选中记录吗？', function(a){
			if(a=='yes'){
				me.store.remove(me.changeobj);//删除行
				$.get('php/gridajax.php?action=del&id='+me.changeobj.data.id+'');
				Ext.example.msg('提示', '删除成功');
			}
		});
	},

	//新增、编辑窗口
	_window:function(){
		var me = this;
		if(!me.win){
			me.win	= Ext.create('Ext.Window',{
				closeAction:'hide',
				width:300,
				maximizable:true,
				collapsible:true,
				modal:true,
				layout: 'fit',
				items:{
					xtype:'form',
					layout:'anchor',
					bodyPadding:5,
					border:false,
					defaultType: 'textfield',
					fieldDefaults:{labelAlign: 'right',labelWidth:80,xtype:'textfield',labelSeparator:' ',anchor:'99%',padding:2},
					items:[{
						name:'id',hidden:true
					},{
						name:'user',fieldLabel:'<font color=red>*</font>用户名',allowBlank:false
					},{
						name:'name',fieldLabel:'<font color=red>*</font>姓名',allowBlank:false
					},{
						xtype: 'radiogroup',
						fieldLabel: '<font color=red>*</font>性别',
						items: [
							{boxLabel: '男', name: 'sex', inputValue: '男', checked: true},
							{boxLabel: '女', name: 'sex', inputValue: '女'}
						]
					},{
						name:'birth',
						fieldLabel:'出生日期',
						xtype: 'datefield',
						format: 'y-m-d',

					},
					{
						xtype:'treepicker',
						fieldLabel: '<font color=red>*</font>部门',
						name:'deptid',
						allowBlank:false,
						store:me._deptsrote(),
						displayField: 'name',
						value:'0',
						rootVisible:false,
						minPickerHeight: 200
					},{
						name:'tel',fieldLabel:'<font color=red>*</font>电话',allowBlank:false
					},{
						name:'email',fieldLabel:'<font color=red>*</font>邮箱',allowBlank:false
					}],
					buttons:[{
						xtype:'tbtext',itemId:'msg'
					},{
						text:'确定',formBind: true,icon:'images/save.gif',handler:function(){
							var msg = me.win.down('#msg');
							//提交保存
							msg.setText('处理中...');
							me.form.submit({
								url:'php/gridajax.php?action=update',
								method:'POST',
								success:function(f,o){
									msg.setText('<font color=green>'+o.result.msg+'</font>');
									me.win.hide();
									me.store.reload();//重新加载数据源
								},
								failure:function(f,o){
									msg.setText('<font color=red>处理失败</font>');
									getarr(o.response)
								}
							});

						}
					}]
				}
			});
		}
		me.win.show();
		me.form = me.win.down('form').getForm();
	},
	_deptsrote:function(){
		var storeopt= {
			fields:['name','sort','id','pid'],
			autoLoad:true,
			proxy: {
				type: 'ajax',
				url:'php/deptajax.php?action=data',
				actionMethods:{read : 'POST'},
				extraParams:{}
			}
		};
		var store	= Ext.create('Ext.data.TreeStore', storeopt);
		return store;
	},

});
