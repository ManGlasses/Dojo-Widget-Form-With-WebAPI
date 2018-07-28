define([
    'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/_base/declare',
    'widget/restaurant/formRestaurant',
    'dojo/text!./templates/formFood.html',
    'widget/form/textboxNumber'
], function (domConstruct, domAttr, declare, formRestaurant, formFood, textboxNumber) {
    return declare([formRestaurant], {
        templateString: formFood,
        addOption: function (id, name) {
            this.inherited(arguments)
        },
        setForm: function (id, name, price) {
            domAttr.set(this.textNameNode, 'value', name)
            domAttr.set(this.selectNode, 'value', id)
            this.textPriceNode.setValue(price)
        },
        getForm: function () {
            return {
                name: domAttr.get(this.textNameNode, 'value'),
                categoryId: domAttr.get(this.selectNode, 'value'),
                price: this.textPriceNode.getValue()
            }
        },
        setCurrency: function (currency) {
            this.textPriceNode.setCurrency(currency)
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