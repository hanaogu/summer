Ext.define('Summer.view.Navigation', {
  extend: 'Ext.panel.Panel',
  xtype: 'navtree',
  collapsible: true,
  split: true,
  layout: {
    type: 'vbox',
    align: 'stretch',
    pack: 'start'
  },
  width: 250,
  title: 'Tree',
  region: 'west',
  defaults: {
    frame: true,
    bodyPadding: 0
  },
  items: {
    xtype: 'treepanel',
    root: {
      text: 'Root',
      expanded: true,
      children: [
        {
          text: 'Child 1',
          leaf: true
            },
        {
          text: 'Child 2',
          leaf: true
            },
        {
          text: 'Child 3',
          expanded: true,
          children: [
            {
              text: 'Grandchild',
              leaf: true
                    }
                ]
            }
        ]
    }
  }
});
