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
        dataType: null,
        data: null,
        addOption: function () {
            this.dataType.forEach((item) => {
                domConstruct.create('option', { innerHTML: item.name, value: item.id }, this.selectShowNode)
            })
        },
        createTable: function () {
            domConstruct.empty(this.tbodyNode)
            let selectShowNodeValue = domAttr.get(this.selectShowNode, 'value')
            this.data.forEach((item, index) => {
                if (item.restaurantTypeId == selectShowNodeValue || selectShowNodeValue == 0) {
                    let trBodyTable = domConstruct.create('tr', null, this.tbodyNode)
                    domConstruct.create('td', { innerHTML: item.restaurantName }, trBodyTable)
                    domConstruct.create('td', { innerHTML: item.restaurantTypeName }, trBodyTable)
                    let tdButtonViewMenu = domConstruct.create('td', null, trBodyTable)
                    let btnViewMenu = domConstruct.create('input', { type: 'button', value: 'View Menu' }, tdButtonViewMenu)
                    on(btnViewMenu, 'click', () => {
                        this.onClick_btnViewMenu(item.restaurantId)
                    })

                    let tdButtonEdit = domConstruct.create('td', null, trBodyTable)
                    let btnEdit = domConstruct.create('input', { type: 'button', value: 'Edit' }, tdButtonEdit)
                    on(btnEdit, 'click', () => {
                        this.onClick_btnEdit(item.restaurantId)
                    })

                    let tdButtonDelete = domConstruct.create('td', null, trBodyTable)
                    let btnDelete = domConstruct.create('input', { type: 'button', value: 'Delete' }, tdButtonDelete)
                    on(btnDelete, 'click', () => {
                        if (confirm('ต้องการลบข้อมูลหรือไม่')) {
                            this.onClick_btnDelete(item.restaurantId)
                        }
                    })
                }
            })
        },
        addNewRow: function () {
            this.onClick_btnAddNewRow()
        },
        onClick_btnViewMenu: function (id) { },
        onClick_btnEdit: function (id) { },
        onClick_btnDelete: function (id) { },
        onClick_btnAddNewRow: function () { },
        startup: function (dataType, data) {
            this.dataType = dataType
            this.data = data
            this.addOption()
            this.createTable()
        }
    })
})