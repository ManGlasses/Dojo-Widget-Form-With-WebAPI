define([
    'dojo/dom-attr',
    'dojo/_base/declare',
    'widget/restaurant/formRestaurant',
    'dojo/text!./templates/formMenu.html',
    'widget/form/textboxNumber'
], function (domAttr, declare, formRestaurant, formMenu) {
    return declare([formRestaurant], {
        templateString: formMenu,
        dataType: '',
        postCreate: function () {
            this.inherited(arguments)
            this.textPriceNode.setCurrency('Baht')
        },
        addOption: function () {
            this.inherited(arguments)
        },
        setForm: function (data) {
            domAttr.set(this.textNameNode, 'value', data.name)
            domAttr.set(this.selectNode, 'value', data.categoryId)
            this.textPriceNode.setValue(data.price)
        },
        getForm: function () {
            let menuCategoryName = this.dataType.find((item) => {
                return item.id == domAttr.get(this.selectNode, 'value')
            }).name
            return {
                name: domAttr.get(this.textNameNode, 'value'),
                categoryId: domAttr.get(this.selectNode, 'value'),
                categoryName: menuCategoryName,
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