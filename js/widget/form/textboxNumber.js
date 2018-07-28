define([
    'dojo/dom-attr',
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!./templates/textboxNumber.html'
], function (domAttr, declare, _WidgetBase, _TemplatedMixin, textboxNumber) {
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: textboxNumber,
        setCurrency: function (currency) {
            domAttr.set(this.currencyNode, 'innerHTML', currency)
        },
        check: function () {
            domAttr.set(this.textNumberNode, 'value', domAttr.get(this.textNumberNode, 'value').replace(/[^0-9]/g, ""))
        },
        getValue: function () {
            return domAttr.get(this.textNumberNode, 'value')
        },
        setValue: function (data) {
            domAttr.set(this.textNumberNode, 'value', data)
        }
    })
})