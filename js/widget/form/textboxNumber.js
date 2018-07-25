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
            if (/\D/.test(domAttr.get(this.textNumberNode, 'value'))) {
                domAttr.set(this.messageNode, 'innerHTML', 'กรอกข้อมูลที่เป็นตัวเลขเท่านั้น')
            }
            else {
                domAttr.set(this.messageNode, 'innerHTML', '')
            }
        },
        getValue: function () {
            return domAttr.get(this.textNumberNode, 'value')
        },
        setValue: function (data) {
            domAttr.set(this.textNumberNode, 'value', data)
        }
    })
})