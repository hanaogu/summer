Ext.define('Summer.view.SPanel', {
  extend: 'Ext.container.Container',
  xtype: 's-panel',
  loader: {
    renderer: 'component'
  },
  initComponent: function() {
    this.callParent();
    if (this.loadurl) {
      this.getLoader().load({url: this.loadurl});
    }
    else {
      console.error('Error! Summer.view.SPanel not give a loadurl');
    }
  },
});

Ext.define('Summer.view.TabPanel', {
  extend: 'Ext.tab.Panel',
  collapsible: true,
  split: true,
  tabBarHeaderPosition: 1,
  tabBar: {
    flex: 20
  },
  initComponent: function() {
    this.callParent();
    if (this.loadurl) {
      this.getLoader().load({url: this.loadurl});
    }
    else {
      console.error('Error! Summer.view.TabPanel not give a loadurl');
    }
  },
  loader: {
    renderer: function(loader, response, active) {
      var panels = Ext.JSON.decode(response.responseText);
      Ext.each(panels, function(panel) {
        var me = loader.getTarget();
        me.add({
          xtype: 's-panel',
          title: panel.name,
          icon: panel.icon,
          loadurl: panel.url,
        });
      });
    return true;
    }
  },
});
