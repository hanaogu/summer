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
    renderer: function (loader, response, active) {
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
      //loader.getTarget().getEl().dom.href = logo.href;
      return true;
    }
  }
});

Ext.define('Summer.view.UserInfo', {
  extend: 'Ext.button.Button',
  xtype: 'userinfo',
  cls: 'user_info',
  iconCls: 'user_menu',
  scale: 'medium',
  icon: 'images/user.jpg',
  loader: {
    url: 'user',
    autoLoad: true,
    renderer: function (loader, response, active) {
      var user = Ext.JSON.decode(response.responseText);
      var me = loader.getTarget();
      //me.setIcon(user.photo);
      console.log(user.photo);
      me.setText(user.name);
      me.setMenu([Ext.create('Ext.menu.Menu', {
        width: 128,
        floating: false,
        items: [
          {
            cls: 'menu_list',
            text: '个人主页',
          },
          {
            cls: 'menu_list',
            icon: 'images/calendar.gif',
            text: '修改密码',
          },
          {
            cls: 'menu_list',
            icon: 'images/edit.png',
            text: '账号管理',
          },
          {
            cls: 'menu_list',
            icon: 'images/control_power_blue.png',
            text: '退出系统',
            handler: function () {
              Ext.MessageBox.confirm('系统提示', '确定要退出吗？',
                function (a) {
                  if (a == 'yes') {
                    alert('退出成功');
                  }
                });
            }
          }]
      })], false);
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
  bodyStyle: 'background: #438EB9',
  items: [
    {
      xtype: 'logotitle',
      region: 'west'
    },
    {
      xtype: 'userinfo',
      style: 'float: right; border: 0'
    }
  ]
});
