Ext.define('Summer.view.DataGrid', {
  extend: 'Ext.grid.Panel',
  initComponent: function () {
    var me = this;
    this.initStore(me);
    this.initToolbar(me);
    this.initPagingBar(me);
    this.callParent();
  },
  initStore: function (me) {
    me.store = Ext.create('Ext.data.Store', {
      autoLoad: true,
      remoteSort: true,
      model: me.sdata.model,
      proxy: {
        type: 'ajax',
        url: me.sdata.dataUrl,
        reader: {
          type: 'json',
          root: 'data',
          totalProperty: 'total'
        },
        simpleSortMode: true
      },
    });
  },
  initToolbar: function(me) {
    me.tbar = [
      {
        xtype: 'textfield',
        emptyText: me.sdata.queryText,
        itemId: 'queryfield'
      },
      {
        text: '查询',
        icon: 'images/zoom.png',
        handler: function () {
          var na = me.down('#queryfield').getValue();
          if (na == null) na = '';
          me.store.proxy.extraParams.query = na;
          me.store.reload();
        },
      },
      '->', {
        text: '新增',
        icon: 'images/add.png',
        handler: function() {
          me.onAdd(me);
        },
      },
      '-', {
        text: '编辑',
        icon: 'images/edit.png',
        disabled: true,
        handler: function() {
          me.onEdit(me);
        },
        itemId: 'edit',
      },
      '-', {
        text: '删除',
        icon: 'images/delete.png',
        disabled: true,
        handler: function() {
          me.onDel(me);
        },
        itemId: 'del',
      }
    ];
  },
  initPagingBar: function (me) {
    me.bbar = Ext.create('Ext.PagingToolbar', {
      store: me.store,
      displayInfo: true,
      displayMsg: '显示第{0} - {1}条记录 / 共{2}记录',
      emptyMsg: "没有记录",
    });
  },
});
