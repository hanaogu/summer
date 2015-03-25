Ext.define('Summer.view.Widget', {
  extend: 'Ext.panel.Panel',
  xtype: 's-widget',
  loader: {
    renderer: 'component',
  },
  initComponent: function () {
    this.callParent();
    this.getLoader().load({
      url: this.loadurl,
    });
  }
});

Ext.define('Summer.view.MainCenter', {
  extend: 'Ext.tab.Panel',
  dashboard: Ext.create('Ext.dashboard.Dashboard', {
    title: '工作台',
    stateful: false,
  }),
  initComponent: function () {
    this.callParent();
    this.add(this.dashboard);
    this.setActiveTab(0);
    this.getLoader().load({
      url: this.loadurl
    });
  },
  loader: {
    renderer: function (loader, res, act) {
      var widgets = Ext.JSON.decode(res.responseText);
      var me = loader.getTarget();
      Ext.each(widgets, function (widget) {
        me.dashboard.add({
          xtype: 's-widget',
          collapsible: true,
          title: widget.name,
          icon: widget.icon,
          columnWidth: widget.columnWidth,
          loadurl: widget.url,
        });
      });
      return true;
    }
  }
});
