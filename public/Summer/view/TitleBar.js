Ext.define('Summer.view.LogoTitle', {
  extend: 'Ext.container.Container',
  xtype: 'logotitle',
  layout: 'column',
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
          padding: '12 0 0 30',
          autoEl: {
            tag: 'a',
            href: logo.href
          }
        });
        me.add(img);

        var title = Ext.create('Ext.Component', {
          html: logo.title,
          cls: 'logo',
          autoEl: {
            tag: 'a',
            href: logo.href
          }
        });
        me.add(title);
        console.log(me.autoEl);
        me.autoEl.href = logo.href;
        console.log(me.autoEl);
        console.log(me);
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
      style: 'float: right; border: 0; background: none; margin: 0 0 0 0'
    }
//    {
//      xtype: 'toolbar',
//      border: 0,
//      style: 'float:right;margin:5px 0 0 0;background:none;',
//      items: [
//        {
//          xtype: 'textfield',
//          emptyText: '输入查询条件',
//          width: 260,
//        },
//        {
//          text: '搜索',
//          icon: 'images/zoom.png',
//          margin: '0 60% 0 0',
//          handler: function () {
//            var na = me.down('#name').getValue();
//            if (na == null) na = '';
//            me.store.proxy.extraParams.name = na;
//            me.store.reload();
//          }
//        },
//        '->',
//        {
//          icon: 'images/user.png',
//          //text: '用户：管理员',
//          menu: [
//            {
//              icon: 'images/save.gif',
//              text: '个人信息'
//            },
//            '-',
//            {
//              icon: 'images/calendar.gif',
//              text: '修改密码'
//            },
//            {
//              icon: 'images/exit.png',
//              text: '退出系统',
//              handler: function () {
//                Ext.MessageBox.confirm('系统提示', '确定要退出吗？',
//                  function (a) {
//                    if (a == 'yes') {
//                      alert('退出成功');
//                    }
//                  });
//              }
//            }]
//        }]
//    }
  ]
});
