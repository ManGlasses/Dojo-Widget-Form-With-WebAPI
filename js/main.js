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

    // >>>>>>>>>>>>>>>>>>>> restaurant <<<<<<<<<<<<<<<<<<<<
    let _tableRestaurant = new tableRestaurant().placeAt('tableRestaurant')

    // edit restaurant
    let idEditRes
    on(_tableRestaurant, 'Click_btnEdit', function (idRestaurant) {
        jsonQuery.getRestaurantType().then(function (data) {
            let dataRestaurantType = json.parse(data, true).result
            domConstruct.empty(dom.byId('formRestaurant'))
            let _formRestaurant = new formRestaurant().placeAt('formRestaurant')
            _formRestaurant.set_textbox(0, 200)
            dataRestaurantType.forEach((item) => {
                _formRestaurant.addOption(item.id, item.name)
            })
            jsonQuery.getRestaurantById(idRestaurant).then(function (data) {
                let dataRestaurantById = json.parse(data, true).result[0]
                _formRestaurant.setForm(dataRestaurantById.restaurantTypeId, dataRestaurantById.restaurantName, dataRestaurantById.detail)
                idEditRes = idRestaurant
                on(_formRestaurant, 'Click_btnSave', function () {
                    if (confirm('ต้องการบันทึกข้อมูลหรือไม่')) {
                        let inputFormRestaurant = _formRestaurant.getForm()
                        jsonQuery.updateRestaurant(idRestaurant, inputFormRestaurant.name, inputFormRestaurant.detail, inputFormRestaurant.typeId).then(function () {
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
    }) // end edit restaurant

    // delete restaurant
    on(_tableRestaurant, 'Click_btnDelete', function (idRestaurant) {
        if (confirm('ต้องการลบข้อมูลหรือไม่')) {
            jsonQuery.deleteRestaurant(idRestaurant).then(function (data) {
                let idDeleteRes = data.result.id
                if (idDeleteRes == idEditRes) {
                    domConstruct.empty(dom.byId('formRestaurant'))
                }
                if (idDeleteRes == idViewMenu) {
                    domConstruct.empty(dom.byId('tableFood'))
                    domConstruct.empty(dom.byId('formFood'))
                }
                updateTableRestaurant()
                alert('ลบข้อมูลเรียบร้อย')
            })
        }
    }) // end delete restaurant

    // add restaurant
    on(_tableRestaurant, 'Click_btnAddNewRow', function () {
        jsonQuery.getRestaurantType().then(function (data) {
            let dataRestaurantType = json.parse(data, true).result
            domConstruct.empty(dom.byId('formRestaurant'))
            let _formRestaurant = new formRestaurant().placeAt('formRestaurant')
            _formRestaurant.set_textbox(0, 200)
            dataRestaurantType.forEach((item) => {
                _formRestaurant.addOption(item.id, item.name)
            })
            on(_formRestaurant, 'Click_btnSave', function () {
                if (confirm('ต้องการเพิ่มข้อมูลหรือไม่')) {
                    let inputFormRestaurant = _formRestaurant.getForm()
                    jsonQuery.addRestaurant(inputFormRestaurant.name, inputFormRestaurant.detail, inputFormRestaurant.typeId).then(function () {
                        updateTableRestaurant()
                        alert('เพิ่มข้อมูลเรียบร้อย')
                    })
                }
            })
            on(_formRestaurant, 'Click_btnCancel', function () {
                domConstruct.empty(dom.byId('formRestaurant'))
            })
        })
    }) // end add restaurant

    // view menu
    let idViewMenu
    on(_tableRestaurant, 'Click_btnViewMenu', function (idRestaurant) {

        // >>>>>>>>>>>>>>>>>>>> food <<<<<<<<<<<<<<<<<<<<
        idViewMenu = idRestaurant
        let _tableFood = new tableFood()
        domConstruct.empty(dom.byId('tableFood'))
        _tableFood.placeAt('tableFood')
        domConstruct.empty(dom.byId('formFood'))

        // edit food
        let idEditFood
        on(_tableFood, 'Click_btnEdit', function (idFood) {
            jsonQuery.getFoodCategory().then(function (data) {
                let dataFoodCategory = json.parse(data, true).result
                domConstruct.empty(dom.byId('formFood'))
                let _formFood = new formFood().placeAt('formFood')
                dataFoodCategory.forEach((item) => {
                    _formFood.addOption(item.categoryId, item.categoryName)
                })

                _formFood.set_textbox(0, 200)
                _formFood.set_textboxNumber('Baht', 0, Number.MAX_SAFE_INTEGER)

                jsonQuery.getFood().then(function (data) {
                    let dataFood = json.parse(data, true).result
                    let dataFoodById = dataFood.find((item) => {
                        return item.foodId == idFood
                    })
                    _formFood.setForm(dataFoodById.categoryId, dataFoodById.foodName, dataFoodById.price)
                    idEditFood = idFood
                    on(_formFood, 'Click_btnSave', function () {
                        if (confirm('ต้องการบันทึกข้อมูลหรือไม่')) {
                            let inputFormFood = _formFood.getForm()
                            jsonQuery.updateFood(idFood, inputFormFood.name, inputFormFood.price, inputFormFood.categoryId, idRestaurant).then(function () {
                                updateTableFood()
                                alert('บันทึกข้อมูลเรียบร้อย')
                            })
                        }
                    })
                    on(_formFood, 'Click_btnCancel', function () {
                        domConstruct.empty(dom.byId('formFood'))
                    })
                })
            })
        }) // end edit food

        // delete food
        on(_tableFood, 'Click_btnDelete', function (idFood) {
            if (confirm('ต้องการลบข้อมูลหรือไม่')) {
                jsonQuery.deleteFood(idFood).then(function () {
                    if (idFood == idEditFood) {
                        domConstruct.empty(dom.byId('formFood'))
                    }
                    updateTableFood()
                    alert('ลบข้อมูลเรียบร้อย')
                })
            }
        }) // end delete food

        // add food
        on(_tableFood, 'Click_btnAddNewRow', function () {
            jsonQuery.getFoodCategory().then(function (data) {
                let dataFoodCategory = json.parse(data, true).result
                domConstruct.empty(dom.byId('formFood'))
                let _formFood = new formFood().placeAt('formFood')
                dataFoodCategory.forEach((item) => {
                    _formFood.addOption(item.categoryId, item.categoryName)
                })

                _formFood.set_textbox(0, 200)
                _formFood.set_textboxNumber('Baht', 0, Number.MAX_SAFE_INTEGER)

                on(_formFood, 'Click_btnSave', function () {
                    if (confirm('ต้องการเพิ่มข้อมูลหรือไม่')) {
                        let inputFormFood = _formFood.getForm()
                        jsonQuery.addFood(inputFormFood.name, inputFormFood.price, inputFormFood.categoryId, idRestaurant).then(function () {
                            updateTableFood()
                            alert('เพิ่มข้อมูลเรียบร้อย')
                        })
                    }
                })
                on(_formFood, 'Click_btnCancel', function () {
                    domConstruct.empty(dom.byId('formFood'))
                })
            })
        }) // end add food

        // request food
        jsonQuery.getRestaurantById(idRestaurant).then(function (data) {
            let dataRestaurantById = json.parse(data, true).result[0]
            _tableFood.setNameRestaurant(dataRestaurantById.restaurantName)
            all({
                getFoodCategory: jsonQuery.getFoodCategory(),
                getFood: jsonQuery.getFood()
            }).then(function (data) {
                let dataFoodCategory = json.parse(data.getFoodCategory, true).result
                let dataFood = json.parse(data.getFood, true).result
                _tableFood.clearTable()
                let dataFoodByIdRestaurant
                if (dataRestaurantById.food != null) {
                    dataFoodByIdRestaurant = dataRestaurantById.food.map((restaurant) => {
                        return dataFood.find((food) => {
                            return restaurant == food.foodId
                        })
                    })
                    dataFoodByIdRestaurant.forEach((item) => {
                        _tableFood.createTable(item.foodId, item.foodName, item.categoryName, item.price)
                    })
                }
                dataFoodCategory.forEach((item) => {
                    _tableFood.addOption(item.categoryId, item.categoryName)
                })
            })

        }) // end request food

        let updateTableFood = function () {
            jsonQuery.getRestaurantById(idRestaurant).then(function (data) {
                let dataRestaurantById = json.parse(data, true).result[0]
                jsonQuery.getFood().then(function (data) {
                    let dataFood = json.parse(data, true).result
                    _tableFood.clearTable()
                    let dataFoodByIdRestaurant
                    if (dataRestaurantById.food != null) {
                        dataFoodByIdRestaurant = dataRestaurantById.food.map((restaurant) => {
                            return dataFood.find((food) => {
                                return restaurant == food.foodId
                            })
                        })
                        dataFoodByIdRestaurant.forEach((item) => {
                            _tableFood.createTable(item.foodId, item.foodName, item.categoryName, item.price)
                        })
                    }
                })
            })
        }
        // >>>>>>>>>>>>>>>>>>>> end food <<<<<<<<<<<<<<<<<<<<

    }) // end view menu

    // request restaurant
    all({
        getRestaurantType: jsonQuery.getRestaurantType(),
        getRestaurant: jsonQuery.getRestaurant()
    }).then(function (data) {
        let dataRestaurantType = json.parse(data.getRestaurantType, true).result
        let dataRestaurant = json.parse(data.getRestaurant, true).result
        dataRestaurantType.forEach((item) => {
            _tableRestaurant.addOption(item.id, item.name)
        })
        dataRestaurant.forEach((item) => {
            _tableRestaurant.createTable(item.restaurantId, item.restaurantName, item.restaurantTypeName)
        })
    }) // end request restaurant

    let updateTableRestaurant = function () {
        jsonQuery.getRestaurant().then(function (data) {
            let dataRestaurant = json.parse(data, true).result
            _tableRestaurant.clearTable()
            dataRestaurant.forEach((item) => {
                _tableRestaurant.createTable(item.restaurantId, item.restaurantName, item.restaurantTypeName)
            })
        })
    }
    // >>>>>>>>>>>>>>>>>>>> end restaurant <<<<<<<<<<<<<<<<<<<<

})