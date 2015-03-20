Ext.BLANK_IMAGE_URL = 'images/white.gif'; //定义空白图片（防止没有联网，图标出不来）

Summer = {}; //定义全局变量，承载全局函数

//! 创建标题栏，带logo和titlbe，以及用户头像菜单等
var titleBar = Ext.create('Summer.view.TitleBar', {
  region: 'north',
  logoUrl: 'Test/logo.json', //从后台框架获取logo图片和title等信息的地址
  userUrl: 'Test/user.json', //从后台框架获取用户头像和名称等信息的地址
  userMenu: [
    {
      cls: 'menu_list',
      text: '个人主页',
    },
    {
      cls: 'menu_list',
      icon: '',
      text: '修改密码',
    },
    {
      cls: 'menu_list',
      icon: '',
      text: '账号管理',
    },
    {
      cls: 'menu_list',
      icon: '',
      text: '退出系统',
      handler: function () {
        Ext.MessageBox.confirm('系统提示', '确定要退出吗？',
          function (a) {
            if (a == 'yes') {
              alert('退出成功');
            }
          });
      }
    }
  ],
});

//! 创建主工作区面板，其自动加载各个widget
var centerPanel = Ext.create('Summer.view.MainCenter', {
  region: 'center',
  activeTab: 0,
  loadurl: 'Test/widgets.json',
});

//! 创建左侧面板，然后将导航面板嵌入进去
var westPanel = Ext.create('Summer.view.TabPanel', {
  region: 'west',
  width: 200,
  loadurl: 'Test/panels.json',
  items: [
    Ext.create('Summer.view.Navigation', {
      title: '功能导航',
      loadurl: 'Test/nav.json'
    })
  ]
});

//! 创建右侧面板
var eastPanel = Ext.create('Summer.view.TabPanel', {
  region: 'east',
  width: 200,
  loadurl: 'Test/panels.json',
});

//! 创建底部面板
var southPanel = Ext.create('Summer.view.TabPanel', {
  region: 'south',
  width: 200,
  loadurl: 'Test/panels.json',
});

//! 页面装载完毕后创建布局，将各个板块放入布局
Ext.onReady(function () {
  Ext.create('Ext.container.Viewport', {
    layout: 'border',
    items: [
      titleBar,
      eastPanel,
      southPanel,
      westPanel,
      centerPanel,
    ]
  });
});

//! 所有的全局函数从这儿开始写
//! addTabs，负责根据url将主工作面板添加到主工作区的tab容器里
Summer.addTabs = function (id, name, url, icon) {
  if (Ext.getCmp(id)) {
    centerPanel.setActiveTab(id);
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
  centerPanel.add(tab).show();
};
