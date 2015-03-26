Ext.define('Summer.data.Data', {
  extend: 'Ext.Component',
  dataUrl: '',
  fields: [], // {cname:'列名称', fname:'fieldName', type: 'string', defaultValue: 'Unknown', display: true, }
  pageSize: 42,
  model: {},
  initComponent: function() {
    this.initModel(this);
    this.callParent();
  },
  initModel: function(me) {
    me.model = Ext.create('Ext.data.Model', {
      fields: me.fields,
    });
  },
});

