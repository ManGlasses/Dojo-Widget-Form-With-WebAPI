define([
    'dojo/dom-attr',
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!./templates/textbox.html'
], function (domAttr, declare, _WidgetBase, _TemplatedMixin, textbox) {
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: textbox,
        check: function () {
            domAttr.set(this.textNode, 'value', domAttr.get(this.textNode, 'value')
                .replace(/^\s+|\s+$/g, '')
                .replace(/\s+/g, ' '))
        },
        setMinMaxLength: function (min, max) {
            domAttr.set(this.textNode, 'minlength', min)
            domAttr.set(this.textNode, 'maxlength', max)
        },
        getValue: function () {
            return domAttr.get(this.textNode, 'value')
        },
        setValue: function (data) {
            domAttr.set(this.textNode, 'value', data)
        }
    })
})