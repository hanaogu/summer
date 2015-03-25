Ext.BLANK_IMAGE_URL = 'images/white.gif'; //定义空白图片（防止没有联网，图标出不来）

Summer = {}; //定义全局变量，承载全局函数

//! 主视图类，派生于Ext的Viewport
Ext.define('MainLayout', {
  extend: 'Ext.container.Viewport',
  layout: 'border',
  initComponent: function () {
    var me = this;
    me.callParent();

    //先发起请求得到主界面的布局信息
    Ext.Ajax.request({
      url: this.loadUrl,
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

//! 页面装载完毕后创建布局，将各个板块放入布局
Ext.onReady(function () {
  Summer.mainLayout = Ext.create('MainLayout', {
    loadUrl: 'Test/layout/default.json',
  });
});

//! 所有的全局函数从这儿开始写
//! addTabs，负责根据url将主工作面板添加到主工作区的tab容器里
Summer.addTabs = function (id, name, url, icon) {
  return Summer.mainLayout.addTabs(id, name, url, icon);
};
