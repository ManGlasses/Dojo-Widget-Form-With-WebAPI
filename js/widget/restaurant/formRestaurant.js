define([
    'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./templates/formRestaurant.html'
], function (domConstruct, domAttr, declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, formRestaurant) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: formRestaurant,
        dataType: '',
        postCreate: function () {
            this.addOption()
        },
        addOption: function () {
            this.dataType.forEach((item) => {
                domConstruct.create('option', { innerHTML: item.name, value: item.id }, this.selectNode)
            })
        },
        setForm: function (data) {
            domAttr.set(this.textNameNode, 'value', data.name)
            domAttr.set(this.selectNode, 'value', data.restaurantType)
            domAttr.set(this.textareaDetailNode, 'value', data.detail)
        },
        getForm: function () {
            let resTypeName = this.dataType.find((item) => {
                return item.id == domAttr.get(this.selectNode, 'value')
            }).name
            return {
                name: domAttr.get(this.textNameNode, 'value'),
                restaurantType: domAttr.get(this.selectNode, 'value'),
                restaurantTypeName: resTypeName,
                detail: domAttr.get(this.textareaDetailNode, 'value')
            }
        },
        save: function () {
            this.onClick_btnSave()
        },
        resetForm: function () {
            domAttr.set(this.textNameNode, 'value', '')
            domAttr.set(this.textareaDetailNode, 'value', '')
            this.onClick_btnCancel()
        },
        onClick_btnSave: function () { },
        onClick_btnCancel: function () { }
    })
})