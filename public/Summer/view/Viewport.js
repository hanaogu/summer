//! 主视图类，派生于Ext的Viewport
Ext.define('Summer.view.Viewport', {
  extend: 'Ext.container.Viewport',
  layout: 'border',
  initComponent: function () {
    var me = this;
    me.callParent();

    //先发起请求得到主界面的布局信息
    Ext.Ajax.request({
      url: me.loadUrl,
      success: function (res) {
        var layout = Ext.JSON.decode(res.responseText);

        //布局获取成功后，再根据布局信息加载布局里的css文件到当前页面
        Ext.Ajax.request({
          url: layout.cssUrl,
          success: function (res) {
            Ext.util.CSS.createStyleSheet(res.responseText); //加载css

            //然后开始将布局中定义的组件都放到主视图里
            Ext.each(layout.items, function (item) {
              var op = {
                id: item.cssId,
                region: item.region,
              };
              Ext.each(Object.keys(item.params), function (key) {
                op[key] = item.params[key];
              });
              var it = Ext.create(item.stype, op);
              me.add(it);

              //记录主工作区的tab面板，用于将来动态增加主工作区的tab
              if (item.stype === 'Summer.view.MainCenter') {
                me.mainCenter = it;
              }
            });
          },
        });
      }
    });
  },
  addTabs: function (id, name, url, icon) {
    if (Ext.getCmp(id)) {
      this.mainCenter.setActiveTab(id);
      return;
    }
    var tab = Ext.create('Ext.panel.Panel', {
      id: id,
      title: name,
      icon: icon,
      closable: true,
      loader: {
        url: url,
        autoLoad: true,
        renderer: 'component'
      }
    });
    this.mainCenter.add(tab).show();
  },
});



