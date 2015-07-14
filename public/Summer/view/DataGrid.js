Ext.define('Summer.view.DataGrid', {
  extend: 'Ext.grid.Panel',
  initComponent: function () {
    var me = this;
    this.initStore(me);
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
  initPagingBar: function (me) {
    me.bbar = Ext.create('Ext.PagingToolbar', {
      store: me.store,
      displayInfo: true,
      displayMsg: '显示第{0} - {1}条记录 / 共{2}记录',
      emptyMsg: "没有记录",
    });
  },
});
