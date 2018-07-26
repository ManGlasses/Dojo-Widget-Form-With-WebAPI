require([
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/on',
    'dojo/json',
    'dojo/promise/all',
    'js/jsonQuery.js',
    'widget/restaurant/tableRestaurant',
    'widget/restaurant/formRestaurant',
    'widget/food/tableFood',
    'widget/food/formFood',
    'dojo/domReady!'
], function (dom, domConstruct, on, json, all, jsonQuery, tableRestaurant, formRestaurant, tableFood, formFood) {

    // restaurant
    let _tableRestaurant = new tableRestaurant().placeAt('tableRestaurant')

    // edit restaurant
    on(_tableRestaurant, 'Click_btnEdit', function (id) {
        jsonQuery.getRestaurantType().then(function (data) {
            let dataRestaurantType = json.parse(data, true).result
            domConstruct.empty(dom.byId('formRestaurant'))
            let _formRestaurant = new formRestaurant().placeAt('formRestaurant')
            _formRestaurant.startup(dataRestaurantType)
            jsonQuery.getRestaurantById(id).then(function (data) {
                let dataRestaurantById = json.parse(data, true).result[0]
                _formRestaurant.setForm(dataRestaurantById)
                on(_formRestaurant, 'Click_btnSave', function () {
                    if (confirm('ต้องการบันทึกข้อมูลหรือไม่')) {
                        let dataFormRestaurant = _formRestaurant.getForm()
                        jsonQuery.updateRestaurant(id, dataFormRestaurant.name, dataFormRestaurant.detail, dataFormRestaurant.type).then(function () {
                            updateTableRestaurant()
                            alert('บันทึกข้อมูลเรียบร้อย')
                        })
                    }
                })
                on(_formRestaurant, 'Click_btnCancel', function () {
                    domConstruct.empty(dom.byId('formRestaurant'))
                })
            })
        })
    })

    // delete restaurant
    on(_tableRestaurant, 'Click_btnDelete', function (id) {
        jsonQuery.deleteRestaurant(id).then(function (data) {
            let idDeleteRes = data.result.id
            if (idDeleteRes == id) {
                domConstruct.empty(dom.byId('formRestaurant'))
            }
            updateTableRestaurant()
            alert('ลบข้อมูลเรียบร้อย')
        })
    })

    // add restaurant
    on(_tableRestaurant, 'Click_btnAddNewRow', function () {
        jsonQuery.getRestaurantType().then(function (data) {
            let dataRestaurantType = json.parse(data, true).result
            domConstruct.empty(dom.byId('formRestaurant'))
            let _formRestaurant = new formRestaurant().placeAt('formRestaurant')
            _formRestaurant.startup(dataRestaurantType)
            on(_formRestaurant, 'Click_btnSave', function () {
                if (confirm('ต้องการเพิ่มข้อมูลหรือไม่')) {
                    let inputFormRestaurant = _formRestaurant.getForm()
                    jsonQuery.addRestaurant(inputFormRestaurant.name, inputFormRestaurant.detail, inputFormRestaurant.type).then(function () {
                        updateTableRestaurant()
                        alert('เพิ่มข้อมูลเรียบร้อย')
                    })
                }
            })
            on(_formRestaurant, 'Click_btnCancel', function () {
                domConstruct.empty(dom.byId('formRestaurant'))
            })
        })
    })

    // view menu
    let _tableFood = new tableFood()
    let _formFood = new formFood()
    on(_tableRestaurant, 'Click_btnViewMenu', function (id) {

        // menu
        _tableFood.placeAt('tableFood')
        _formFood.placeAt('formFood')

        jsonQuery.getRestaurantById(id).then(function (data) {
            let dataRestaurantById = json.parse(data, true).result[0]
            _tableFood.setNameRestaurant(dataRestaurantById.restaurantName)
        })


    })

    // request
    all({
        getRestaurantType: jsonQuery.getRestaurantType(),
        getRestaurant: jsonQuery.getRestaurant()
    }).then(function (data) {
        let dataRestaurantType = json.parse(data.getRestaurantType, true).result
        let dataRestaurant = json.parse(data.getRestaurant, true).result
        _tableRestaurant.startup(dataRestaurantType, dataRestaurant)
    })

    let updateTableRestaurant = function () {
        jsonQuery.getRestaurant().then(function (data) {
            let dataRestaurant = json.parse(data, true).result
            _tableRestaurant.data = dataRestaurant
            _tableRestaurant.createTable()
        })
    }

})