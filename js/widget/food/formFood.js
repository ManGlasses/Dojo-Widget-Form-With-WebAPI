define([
    'dojo/dom-attr',
    'dojo/_base/declare',
    'widget/restaurant/formRestaurant',
    'dojo/text!./templates/formFood.html',
    'widget/form/textbox',
    'widget/form/textboxNumber'
], function (domAttr, declare, formRestaurant, formFood) {
    return declare([formRestaurant], {
        templateString: formFood,
        addOption: function (id, name) {
            this.inherited(arguments)
        },
        setForm: function (id, name, price) {
            this.textNameNode.setValue(name)
            domAttr.set(this.selectNode, 'value', id)
            this.textPriceNode.setValue(price)
        },
        getForm: function () {
            return {
                name: this.textNameNode.getValue(),
                categoryId: domAttr.get(this.selectNode, 'value'),
                price: this.textPriceNode.getValue()
            }
        },
        set_textbox: function (min, max) {
            this.textNameNode.setMinMaxLength(min, max)
        },
        set_textboxNumber: function (currency, min, max) {
            this.textPriceNode.setCurrency(currency)
            this.textPriceNode.setMinMax(min, max)
        },
        saveForm: function () {
            this.onClick_btnSave()
        },
        resetForm: function () {
            domAttr.set(this.textNameNode, 'value', '')
            this.textPriceNode.setValue('')
            this.onClick_btnCancel()
        },
        onClick_btnSave: function () { },
        onClick_btnCancel: function () { }
    })
})