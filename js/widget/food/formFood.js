define([
    'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/_base/declare',
    'widget/restaurant/formRestaurant',
    'dojo/text!./templates/formFood.html',
    'widget/form/textboxNumber'
], function (domConstruct, domAttr, declare, formRestaurant, formFood) {
    return declare([formRestaurant], {
        templateString: formFood,
        dataType: null,
        addOption: function () {
            this.dataType.forEach((item) => {
                domConstruct.create('option', { innerHTML: item.categoryName, value: item.categoryId }, this.selectNode)
            })
        },
        setForm: function (data) {
            domAttr.set(this.textNameNode, 'value', data.foodName)
            domAttr.set(this.selectNode, 'value', data.categoryId)
            this.textPriceNode.setValue(data.price)
        },
        getForm: function () {
            let foodCategoryName = this.dataType.find((item) => {
                return item.categoryId == domAttr.get(this.selectNode, 'value')
            }).name
            return {
                name: domAttr.get(this.textNameNode, 'value'),
                categoryId: domAttr.get(this.selectNode, 'value'),
                categoryName: foodCategoryName,
                price: this.textPriceNode.getValue()
            }
        },
        save: function () {
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