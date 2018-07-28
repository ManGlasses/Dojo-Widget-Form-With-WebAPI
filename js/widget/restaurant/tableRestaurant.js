define([
    'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/on',
    'dojo/query',
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!./templates/tableRestaurant.html',
    'dojo/NodeList-traverse'
], function (domConstruct, domAttr, on, query, declare, _WidgetBase, _TemplatedMixin, tableRestaurant) {
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: tableRestaurant,
        addOption: function (id, name) {
            domConstruct.create('option', { innerHTML: name, value: id }, this.selectShowNode)
        },
        createTable: function (id, name, typeName) {
            let trBodyTable = domConstruct.create('tr', null, this.tbodyNode)
            domConstruct.create('td', { innerHTML: name }, trBodyTable)
            domConstruct.create('td', { innerHTML: typeName }, trBodyTable)
            let tdButtonViewMenu = domConstruct.create('td', null, trBodyTable)
            let btnViewMenu = domConstruct.create('input', { type: 'button', value: 'View Menu' }, tdButtonViewMenu)
            on(btnViewMenu, 'click', () => {
                this.onClick_btnViewMenu(id)
            })

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
            domConstruct.empty(this.tbodyNode)
        },
        filterTable: function () {
            let select = query(this.selectShowNode).children('option')
            let selected = select.find((item) => {
                return domAttr.get(item, 'value') == domAttr.get(this.selectShowNode, 'value')
            })
            let countRow = 0
            let tr = query(this.tbodyNode).children('tr')
            tr.forEach((item) => {
                let tdTpye = query(item).children('td')[1]
                if (tdTpye.innerHTML == selected.innerHTML || domAttr.get(this.selectShowNode, 'value') == 0) {
                    domAttr.set(item, 'style', { display: '' })
                    countRow % 2 == 0 ? domAttr.set(item, 'style', { backgroundColor: '#ffff' }) : domAttr.set(item, 'style', { backgroundColor: '#ddd' })
                    countRow++
                }
                else {
                    domAttr.set(item, 'style', { display: 'none' })
                }
            })
        },
        addNewRow: function () {
            this.onClick_btnAddNewRow()
        },
        onClick_btnViewMenu: function (id) { },
        onClick_btnEdit: function (id) { },
        onClick_btnDelete: function (id) { },
        onClick_btnAddNewRow: function () { }
    })
})