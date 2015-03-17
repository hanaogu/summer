Ext.define('Summer.view.LogoTitle', {
  extend: 'Ext.container.Container',
  xtype: 'logotitle',
  layout: 'column',
  height: '100%',
  autoEl: {
    tag: 'a',
    href: '#'
  },
  initComponent: function () {
    var me = this;
    Ext.Ajax.request({
      url: 'logo',
      success: function (res) {
        var logo = Ext.JSON.decode(res.responseText);
        var img = Ext.create('Ext.Img', {
          src: logo.url,
          cls: 'logo',
        });
        me.add(img);
        var title = Ext.create('Ext.Component', {
          html: logo.title,
          cls: 'title',
        });
        me.add(title);
        me.getEl().dom.href = logo.href;
      }
    });
    this.callParent();
  }
});

Ext.define('Summer.view.UserInfo', {
  extend: 'Ext.container.Container',
  xtype: 'userinfo',
  layout: 'column',
  initComponent: function () {
    var me = this;
    Ext.Ajax.request({
      url: 'user',
      success: function (res) {
        var user = Ext.JSON.decode(res.responseText);
        var img = Ext.create('Ext.Img', {
          src: user.photo,
          imgCls: 'userphoto'
        });
        me.add(img);
        var username = Ext.create('Ext.Component', {
          html: user.name,
          cls: 'username'
        });
        me.add(username);
      }
    });
    this.callParent();
  }
});

Ext.define('Summer.view.TitleBar', {
  extend: 'Ext.panel.Panel',
  xtype: 'titlebar',
  layout: 'column',
  region: 'north',
  border: 0,
  height: 42,
  bodyStyle: 'background: #438eb9',
  items: [
    {
      xtype: 'logotitle',
      region: 'west'
    },
    {
      xtype: 'userinfo',
      style: 'float: right; border: 0; padding: 0 42px 0 0;background: none; margin: 0 0 0 0'
    }
  ]
});
