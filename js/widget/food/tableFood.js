define([
    'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/on',
    'dojo/_base/declare',
    'widget/restaurant/tableRestaurant',
    'dojo/text!./templates/tableFood.html'
], function (domConstruct, domAttr, on, declare, tableRestaurant, tableFood) {
    return declare([tableRestaurant], {
        templateString: tableFood,
        dataType: null,
        data: null,
        setNameRestaurant: function (nameRestaurant) {
            domAttr.set(this.h3NameResNode, 'innerHTML', `${nameRestaurant}'s Menu`)
        },
        addOption: function () {
            this.dataType.forEach((item) => {
                domConstruct.create('option', { innerHTML: item.categoryName, value: item.categoryId }, this.selectShowNode)
            })
        },
        createTable: function () {
            domConstruct.empty(this.tbodyNode)
            let selectShowNodeValue = domAttr.get(this.selectShowNode, 'value')
            this.data.forEach((item, index) => {
                if (item.categoryId == selectShowNodeValue || selectShowNodeValue == 0) {
                    let trBodyTable = domConstruct.create('tr', null, this.tbodyNode)
                    domConstruct.create('td', { innerHTML: item.foodName }, trBodyTable)
                    domConstruct.create('td', { innerHTML: item.categoryName }, trBodyTable)
                    domConstruct.create('td', { innerHTML: item.price }, trBodyTable)
                    let tdButtonEdit = domConstruct.create('td', null, trBodyTable)
                    let btnEdit = domConstruct.create('input', { type: 'button', value: 'Edit' }, tdButtonEdit)
                    on(btnEdit, 'click', () => {
                        this.onClick_btnEdit(item, index)
                    })

                    let tdButtonDelete = domConstruct.create('td', null, trBodyTable)
                    let btnDelete = domConstruct.create('input', { type: 'button', value: 'Delete' }, tdButtonDelete)
                    on(btnDelete, 'click', () => {
                        if (confirm('ต้องการลบข้อมูลหรือไม่')) {
                            this.onClick_btnDelete(index)
                        }
                    })
                }
            })
        },
        addNewRow: function () {
            if (confirm('ต้องการเพิ่มข้อมูลหรือไม่')) {
                this.onClick_btnAddNewRow()
            }
        },
        onClick_btnEdit: function (item, index) { },
        onClick_btnDelete: function (index) { },
        onClick_btnAddNewRow: function () { }
    })
})