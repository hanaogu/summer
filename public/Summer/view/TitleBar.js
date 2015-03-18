Ext.define('Summer.view.LogoTitle', {
  extend: 'Ext.container.Container',
  xtype: 'logotitle',
  layout: 'column',
  height: '100%',
  autoEl: {
    tag: 'a',
    href: '#'
  },
  loader: {
    url: 'logo',
    autoLoad: true,
    renderer: function(loader, response, active) {
      var logo = Ext.JSON.decode(response.responseText);
      var img = Ext.create('Ext.Img', {
          src: logo.url,
          cls: 'logo',
        });
      loader.getTarget().add(img);
      var title = Ext.create('Ext.Component', {
          html: logo.title,
          cls: 'title',
        });
        loader.getTarget().add(title);
      loader.getTarget().getEl().dom.href = logo.href;
      return true;
    }
  }
});

Ext.define('Summer.view.UserInfo', {
  extend: 'Ext.container.Container',
  xtype: 'userinfo',
  layout: 'column',
  loader: {
    url: 'user',
    autoLoad: true,
    renderer: function(loader, response, active) {
      var user = Ext.JSON.decode(response.responseText);
      var img = Ext.create('Ext.Img', {
          src: user.photo,
          imgCls: 'userphoto'
        });
        loader.getTarget().add(img);
        var username = Ext.create('Ext.Component', {
          html: user.name,
          cls: 'username'
        });
        loader.getTarget().add(username);
      return true;
    }
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
