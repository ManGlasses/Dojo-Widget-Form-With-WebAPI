define([
    'dojo/dom-attr',
    'dojo/dom-style',
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!./templates/textboxNumber.html'
], function (domAttr, domStyle, declare, _WidgetBase, _TemplatedMixin, textboxNumber) {
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: textboxNumber,
        myTimeOut: null,
        setCurrency: function (currency) {
            domAttr.set(this.currencyNode, 'innerHTML', currency)
        },
        setMinMax: function (min, max) {
            domAttr.set(this.textNumberNode, 'min', min)
            domAttr.set(this.textNumberNode, 'max', max)
        },
        checkKey: function (event) {
            if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37 || event.keyCode == 39) {
                domStyle.set(this.textNumberNode, {
                    'outline': '',
                    'border': '',
                    'border-radius': '',
                    'box-shadow': '',
                    'padding': ''
                })
                clearTimeout(this.myTimeOut)
            }
            else if (event.keyCode < 48 || event.keyCode > 57) {
                domStyle.set(this.textNumberNode, {
                    'outline': 'none',
                    'border': '1.1px solid red',
                    'border-radius': '2px',
                    'box-shadow': '0 0 1px red',
                    'padding': '2px 1px 2px 1px',
                    'box-sizing': 'border-box'
                })
                this.myTimeOut = setTimeout(() => {
                    domStyle.set(this.textNumberNode, {
                        'outline': '',
                        'border': '',
                        'border-radius': '',
                        'box-shadow': '',
                        'padding': ''
                    })
                }, 3000)
            }
            else {
                domStyle.set(this.textNumberNode, {
                    'outline': '',
                    'border': '',
                    'border-radius': '',
                    'box-shadow': '',
                    'padding': ''
                })
                clearTimeout(this.myTimeOut)
            }
        },
        checkInput: function () {
            domAttr.set(this.textNumberNode, 'value', domAttr.get(this.textNumberNode, 'value').replace(/\D/g, ""))
        },
        getValue: function () {
            return domAttr.get(this.textNumberNode, 'value')
        },
        setValue: function (data) {
            domAttr.set(this.textNumberNode, 'value', data)
        }
    })
})