Ext.BLANK_IMAGE_URL = 'images/white.gif'; //定义空白图片（防止没有联网，图标出不来）

Summer = {}; //定义全局变量，承载全局函数

var westPanel = Ext.create('Ext.tab.Panel', {
  region: 'west',
  collapsible: true,
  width: 220,
  split: true,
  tabBarHeaderPosition: 1,
  tabBar: {
    flex: 20
  },
  items: [
    Ext.create('Summer.view.Navigation', {
      title: '功能导航',
      loadurl: 'test/nav.json'
    })
  ]
});

var centerPanel = Ext.create('Ext.tab.Panel', {
  region: 'center',
  activeTab: 0,
  items: [
    {
      title: 'Default Tab',
      html: 'The first tab\'s content. Others may be added dynamically'
    },
    {
      title: 'FormTag',
      loader: {
        url: 'KitchenSink/FormTag.js',
        autoLoad: true,
        renderer: 'component'
      }
    },
    {
      title: 'robot',
      xtype: 'panel',
      html: '<iframe width="100%" height="100%" src="test/robot.html"></iframe>',
    }
  ]
});

Ext.onReady(function () {
  Ext.create('Ext.container.Viewport', {
    layout: 'border',
    items: [
      Ext.create('Summer.view.TitleBar', {
        region: 'north'
      }),
      westPanel,
      {
        region: 'south',
        title: 'South Panel',
        collapsible: true,
        html: 'Information goes here',
        split: true,
        height: 100,
        minHeight: 100
      },
      {
        region: 'east',
        title: 'East Panel',
        collapsible: true,
        split: true,
        width: 150
      },
      centerPanel
    ]
  });
});
