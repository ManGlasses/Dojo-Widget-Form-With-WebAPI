define([
    'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/on',
    'dojo/_base/declare',
    'widget/restaurant/tableRestaurant',
    'dojo/text!./templates/tableMenu.html'
], function (domConstruct, domAttr, on, declare, tableRestaurant, tableMenu) {
    return declare([tableRestaurant], {
        templateString: tableMenu,
        dataType: '',
        data: '',
        nameRes: '',
        postCreate: function () {
            domAttr.set(this.h3NameResNode, 'innerHTML', `${this.nameRes}'s Menu`)
            this.inherited(arguments)
        },
        addOption: function () {
            this.inherited(arguments)
        },
        createTable: function () {
            domConstruct.empty(this.tbodyNode)
            let selectShowNodeValue = domAttr.get(this.selectShowNode, 'value')
            this.data.forEach((item, index) => {
                if (item.categoryId == selectShowNodeValue || selectShowNodeValue == 0) {
                    let trBodyTable = domConstruct.create('tr', null, this.tbodyNode)
                    domConstruct.create('td', { innerHTML: item.name }, trBodyTable)
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