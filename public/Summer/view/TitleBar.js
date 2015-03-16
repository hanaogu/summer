Ext.define('Summer.view.TitleBar', {
  extend: 'Ext.panel.Panel',
  xtype: 'titlebar',
  layout: 'column',
  region: 'north',
  border: '0 0 1 0',
  height: 50,
  items: [
    {
      xtype: 'panel',
      region: 'west',
      border: 0,
      bodyPadding: 8,
      bodystyle: 'background: none;',
      html: '<img src="images/logo.png" style="float:left;margin:0px 0 0 0;"/><span>miniERP</span>'
    },
    {
      xtype: 'toolbar',
      border: 0,
      style: 'float:right;margin:5px 0 0 0;background:none;',
      items: [
        {
          xtype: 'textfield',
          emptyText: '输入查询条件',
          width: 260,
        },
        {
          text: '搜索',
          icon: 'images/zoom.png',
          margin: '0 60% 0 0',
          handler: function () {
            var na = me.down('#name').getValue();
            if (na == null) na = '';
            me.store.proxy.extraParams.name = na;
            me.store.reload();
          }
        },
        '->',
        {
          icon: 'images/user.png',
          //text: '用户：管理员',
          menu: [
            {
              icon: 'images/save.gif',
              text: '个人信息'
            },
            '-',
            {
              icon: 'images/calendar.gif',
              text: '修改密码'
            },
            {
              icon: 'images/exit.png',
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
        }]
    }]
});
