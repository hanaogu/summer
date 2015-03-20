Ext.require(['KitchenSink.model.State']);

Ext.define('KitchenSink.view.FormTag', {
    extend: 'Ext.panel.Panel',
    xtype: 'form-tag',


    title: 'Select State(s)',
    frame: true,
    layout: 'form',
    viewModel: {},
    items: [{
        xtype: 'displayfield',
        fieldLabel: 'Selected States',
        bind: '{states.value}'
    }, {
        xtype: 'tagfield',
        fieldLabel: 'Select a state',
        store: {
            type: 'states'
        },
        value: ['CA'],
        reference: 'states',
        displayField: 'state',
        valueField: 'abbr',
        filterPickList: true,
        queryMode: 'local',
        publishes: 'value'
    }, {
        xtype: 'displayfield',
        fieldLabel: 'Selected Locations',
        bind: '{locations.value}'
    }, {
        xtype: 'tagfield',
        fieldLabel: 'Select/add location',
        store: {
            type: 'states'
        },
        value: ['KS'],
        reference: 'locations',
        displayField: 'state',
        valueField: 'abbr',
        createNewOnEnter: true,
        createNewOnBlur: true,
        filterPickList: true,
        queryMode: 'local',
        publishes: 'value'
    }],
    buttons: [{
        text: 'OK'
    }, {
        text: 'Cancel'
    }],
});
