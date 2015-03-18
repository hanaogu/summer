Ext.BLANK_IMAGE_URL = 'images/white.gif'; //定义空白图片（防止没有联网，图标出不来）

Ext.onReady(function () {
  Ext.create('Ext.container.Viewport', {
    layout: 'border',
    items: [
      Ext.create('Summer.view.TitleBar', {
        region: 'north'
      }),
      Ext.create('Summer.view.Navigation', {
        region: 'west',
        collapsible: true,
        split: true,
        width: 250,
        title: '功能导航',
        loadurl: 'test/nav.json'
      }),
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
      {
        region: 'center',
        xtype: 'tabpanel',
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
      }
    ]
  });
});
