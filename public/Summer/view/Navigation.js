Ext.define('Summer.view.Navigation', {
  extend: 'Ext.panel.Panel',
  xtype: 'navtree',
  layout: 'accordion',
  initComponent: function() {
    this.callParent();
    this.getLoader().load({url: this.loadurl});
  },
  loader: {
    renderer: function(loader, res, act) {
      var navs = Ext.JSON.decode(res.responseText);
      var me = loader.getTarget();
      Ext.each(navs, function(nav) {
        var tree = Ext.create('Ext.tree.Panel', {
          title: nav.name,
          rootVisible: false,
        });
        Ext.each(nav.fn, function(fn) {
          tree.getStore().add({
            id: fn.id,
            text: fn.text,
            icon: fn.icon,
            url: fn.url,
            leaf: true,
          });
        });
        me.add(tree);
      });
      return true;
    }
  }
});
