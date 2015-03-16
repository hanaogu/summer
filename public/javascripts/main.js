Ext.BLANK_IMAGE_URL = 'images/white.gif'; //定义空白图片（防止没有联网，图标出不来）

Ext.require([
  'KitchenSink.view.*',
  'Summer.view.*'
  ]);

Ext.onReady(function () {
  Ext.create('Ext.container.Viewport', {
    layout: 'border',
    items: [
      Ext.create('Summer.view.TitleBar', {
        region: 'north'
      }),
      Ext.create('Summer.view.Navigation'),
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
          Ext.create('KitchenSink.view.formtags', {
            title: 'Formtags'
          }),
          {
            title: 'robot',
            xtype: 'panel',
            html: '<iframe width="100%" height="100%" src="test/robot.html"></iframe>',
          }]
      }]
  });
});
