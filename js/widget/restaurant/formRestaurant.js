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
        addOption: function (id, name) {
            domConstruct.create('option', { innerHTML: name, value: id }, this.selectNode)
        },
        setForm: function (id, name, detail) {
            domAttr.set(this.textNameNode, 'value', name)
            domAttr.set(this.selectNode, 'value', id)
            domAttr.set(this.textareaDetailNode, 'value', detail)
        },
        getForm: function () {
            return {
                name: domAttr.get(this.textNameNode, 'value'),
                typeId: domAttr.get(this.selectNode, 'value'),
                detail: domAttr.get(this.textareaDetailNode, 'value')
            }
        },
        saveForm: function () {
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