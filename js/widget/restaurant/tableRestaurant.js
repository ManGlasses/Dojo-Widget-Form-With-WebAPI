define([
    'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/on',
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!./templates/tableRestaurant.html'
], function (domConstruct, domAttr, on, declare, _WidgetBase, _TemplatedMixin, tableRestaurant) {
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: tableRestaurant,
        dataType: '',
        data: '',
        postCreate: function () {
            this.addOption()
            this.createTable()
        },
        addOption: function () {
            this.dataType.forEach((item) => {
                domConstruct.create('option', { innerHTML: item.name, value: item.id }, this.selectShowNode)
            })
        },
        createTable: function () {
            domConstruct.empty(this.tbodyNode)
            let selectShowNodeValue = domAttr.get(this.selectShowNode, 'value')
            this.data.forEach((item, index) => {
                if (item.restaurantType == selectShowNodeValue || selectShowNodeValue == 0) {
                    let trBodyTable = domConstruct.create('tr', null, this.tbodyNode)
                    domConstruct.create('td', { innerHTML: item.name }, trBodyTable)
                    domConstruct.create('td', { innerHTML: item.restaurantTypeName }, trBodyTable)
                    let tdButtonViewMenu = domConstruct.create('td', null, trBodyTable)
                    let btnViewMenu = domConstruct.create('input', { type: 'button', value: 'View Menu' }, tdButtonViewMenu)
                    on(btnViewMenu, 'click', () => {
                        this.onClick_btnViewMenu(item)
                    })

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
        onClick_btnViewMenu: function () { },
        onClick_btnEdit: function (item, index) { },
        onClick_btnDelete: function (index) { },
        onClick_btnAddNewRow: function () { }
    })
})