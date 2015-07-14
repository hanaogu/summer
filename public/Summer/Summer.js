Ext.Loader.setConfig({enabled: true});

Ext.BLANK_IMAGE_URL = 'images/white.gif'; //定义空白图片（防止没有联网，图标出不来）

Summer = {}; //定义全局变量，承载全局函数

//! 页面装载完毕后创建布局，将各个板块放入布局
Ext.onReady(function () {
  Summer.mainLayout = Ext.create('Summer.view.Viewport', {
    loadUrl: Summer.layoutUrl ? Summer.layoutUrl:'Test/layout/default.json',
  });
});

//! addTabs，负责根据url将主工作面板添加到主工作区的tab容器里
Summer.addTabs = function (id, name, url, icon) {
  return Summer.mainLayout.addTabs(id, name, url, icon);
};