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
        setNameRestaurant: function (name) {
            domAttr.set(this.h3NameResNode, 'innerHTML', `${name}'s Menu`)
        },
        addOption: function (id, name) {
            this.inherited(arguments)
        },
        createTable: function (id, name, categoryName, price) {
            let trBodyTable = domConstruct.create('tr', null, this.tbodyNode)
            domConstruct.create('td', { innerHTML: name }, trBodyTable)
            domConstruct.create('td', { innerHTML: categoryName }, trBodyTable)
            domConstruct.create('td', { innerHTML: price }, trBodyTable)
            let tdButtonEdit = domConstruct.create('td', null, trBodyTable)
            let btnEdit = domConstruct.create('input', { type: 'button', value: 'Edit' }, tdButtonEdit)
            on(btnEdit, 'click', () => {
                this.onClick_btnEdit(id)
            })

            let tdButtonDelete = domConstruct.create('td', null, trBodyTable)
            let btnDelete = domConstruct.create('input', { type: 'button', value: 'Delete' }, tdButtonDelete)
            on(btnDelete, 'click', () => {
                this.onClick_btnDelete(id)
            })
        },
        clearTable: function () {
            this.inherited(arguments)
        },
        filterTable: function () {
            this.inherited(arguments)
        },
        addNewRow: function () {
            this.onClick_btnAddNewRow()
        },
        onClick_btnEdit: function (id) { },
        onClick_btnDelete: function (id) { },
        onClick_btnAddNewRow: function () { }
    })
})