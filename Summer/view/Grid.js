Ext.define('Summer.view.Grid', {
    extend: 'Ext.container.Container',
    initComponent: function() {
        this.callParent();

        var me = this;

        var columns = [];
        var url = me.dataUrl;
        var fields = me.fields;
        var pageSize = me.pageSize;
        var title = me.title;

        Ext.each(this.scolumns,
        function(col) {
            columns.push({
                header: col.name,
                dataIndex: col.field,
                width: col.width,
                align: col.align,
                sortable: col.sortgrid,
                editor: col.edit,
                flex: col.flex,
                format: col.formattime
            });
        });

        var store = Ext.create('Ext.data.Store', {
            pageSize: pageSize,
            //分页数
            fields: fields,
            //字段
            remoteSort: true,
            //请求排序
            autoLoad: true,
            //字段加载
            proxy: {
                type: 'ajax',
                url: url,
                actionMethods: {
                    read: 'POST'
                },
                extraParams: {},
                //参数
                pageParam: "pageIndex",
                limitParam: "limit", //pageSize
                startParam: "start",
                sortParam: "sortField",
                directionParam: "sortOrder",
                timeout: 1200000,
                reader: {
                    type: 'json',
                    root: 'rows',
                    totalProperty: 'totalCount'
                },
                simpleSortMode: true
            }
        });

        var topbar = [{
            xtype: 'textfield',
            emptyText: '姓名/电话/邮箱',
            itemId: 'name'
        },
        {
            text: '查询',
            icon: 'images/zoom.png',
            handler: function() {
                var na = me.down('#name').getValue();
                if (na == null) na = '';
                store.proxy.extraParams.name = na;
                store.reload();
            }
        },
        '->', {
            text: '新增',
            icon: 'images/add.png',
            handler: function() {
               me._clickadd()
            }
        },
        '-', {
            text: '编辑',
            icon: 'images/edit.png',
            disabled: true,
            handler: function() {
                me._clickedit()
            },
            itemId: 'edit'
        },
        '-', {
            text: '删除',
            icon: 'images/delete.png',
            disabled: true,
            handler: function() {
                me._clickdel()
            },
            itemId: 'del'
        }];

        var bottombar = Ext.create('Ext.PagingToolbar', {
            store: store,
            displayInfo: true,
            displayMsg: '显示第{0} - {1}条记录 / 共{2}记录',
            emptyMsg: "没有记录"
        });
        //bottombar.hide();
        //bottombar.show();

        var grid = Ext.create('Ext.grid.Panel', {
            title: title,
            columns: columns,
            store: store,
            tbar: topbar,
            bbar: bottombar,

            selModel: Ext.create('Ext.selection.CheckboxModel', {
                mode: "SIMPLE"
            }),
            //复选框
            plugins: [Ext.create('Ext.grid.plugin.CellEditing')],

            listeners: {
                itemclick: function(o, a) {
                    me.changeobj = a; //记录选中行
                    me.down('#edit').setDisabled(false);
                    me.down('#del').setDisabled(false);
                },
                beforeedit: function(editor, e) {
                    me.oldvalue = e.record.data[e.field];
                    if (me.oldvalue == null) me.oldvalue = '';
                },
                edit: function(editor, e) {
                    me._saveedit(e); //保存编辑
                }
            },
            viewConfig: {
                enableTextSelection: true,
                //可以选择行
                loadMask: true
            }
        });

        me._saveedit = function(e) {
            var val = e.value;
            if (val == null) val = '';
            if (val == this.oldvalue) return;
            var field = e.field;
            var data = {
                field: field,
                value: val,
                id: e.record.data.id
            };
            $.post('http://localhost/erpos22/php/gridajax.php?action=saverow', data,
            function() {
                Ext.example.msg('提示', '保存成功');
            });
        };

        //新增
         me._clickadd = function() {
            me._window();
            me.win.setTitle('新增');
            me.form.reset();
            me.win.down('#msg').setText('');

        };

        //编辑
     	 me._clickedit = function() {
            me._window();
            me.win.setTitle('编辑');
            var changedata = me.changeobj.data;
            me.form.findField('id').setValue(changedata.id);
            me.form.findField('user').setValue(changedata.user);
            me.form.findField('name').setValue(changedata.name);
            me.form.findField('sex').setValue(changedata.sex);
            me.form.findField('tel').setValue(changedata.tel);
            me.form.findField('birth').setValue(changedata.birth);
            me.form.findField('email').setValue(changedata.email);
            me.form.findField('deptid').setValue(changedata.deptid);
            me.win.down('#msg').setText('');
        };

        //删除
        me._clickdel = function() {
     		var delthis = this;
            Ext.MessageBox.confirm('系统提示', '确定要删除选中记录吗？',
            function(a) {
                if (a == 'yes') {
					console.log(me.changeobj);
                    store.remove(me.changeobj); //删除行
                    $.get('http://localhost/erpos22/php/gridajax.php?action=del&id=' + me.changeobj.data.id + '');
                    Ext.example.msg('提示', '删除成功');
                }
            });
        };

		//新增、编辑窗口
	me._window = function(){
		var win_me = this;
		if(!win_me.win){
			win_me.win	= Ext.create('Ext.Window',{
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

					},{
						name:'tel',fieldLabel:'<font color=red>*</font>电话',allowBlank:false
					},{
						name:'email',fieldLabel:'<font color=red>*</font>邮箱',allowBlank:false
					}],
					buttons:[{
						xtype:'tbtext',itemId:'msg'
					},{
						text:'确定',formBind: true,icon:'images/save.gif',handler:function(){
							var msg = win_me.win.down('#msg');
							//提交保存
							msg.setText('处理中...');
							win_me.form.submit({
								url:'http://localhost/erpos22/php/gridajax.php?action=update',
								method:'POST',
								success:function(f,o){
									msg.setText('<font color=green>'+o.result.msg+'</font>');
									win_me.win.hide();
									store.reload();//重新加载数据源
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
		win_me.win.show();
		win_me.form = win_me.win.down('form').getForm();
	};

        this.add(grid);

    }
});
