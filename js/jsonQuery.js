define([
    'dojo/request'
], function (request) {
    let url = 'https://gdev.geotalent.co.th/Training/'
    return {

        // >>>>>>>>>>>>>>>>>>>> restaurant <<<<<<<<<<<<<<<<<<<<
        getRestaurantType: function () {
            return request.get(url + 'api/restauranttype/all')
        },
        getRestaurant: function () {
            return request.get(url + 'api/restaurant/all')
        },
        getRestaurantById: function (id) {
            return request.get(url + 'api/restaurant/' + id)
        },
        addRestaurant: function (name, detail, type) {
            return request.post(url + 'api/restaurant/create', {
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                handleAs: 'json',
                data: JSON.stringify({
                    "name": name,
                    "detail": detail,
                    "type": type
                })
            })
        },
        updateRestaurant: function (id, name, detail, type) {
            return request.post(url + 'api/restaurant/update', {
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                handleAs: 'json',
                data: JSON.stringify({
                    "id": id,
                    "name": name,
                    "detail": detail,
                    "type": type
                })
            })
        },
        deleteRestaurant: function (id) {
            return request.post(url + 'api/restaurant/delete', {
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                handleAs: 'json',
                data: JSON.stringify({
                    "id": id
                })
            })
        },
        // >>>>>>>>>>>>>>>>>>>> end restaurant <<<<<<<<<<<<<<<<<<<<

        // >>>>>>>>>>>>>>>>>>>> food <<<<<<<<<<<<<<<<<<<<
        getFoodCategory: function () {
            return request.get(url + 'api/foodcategory/all')
        },
        getFood: function () {
            return request.get(url + 'api/food/all')
        },
        addFood: function (name, price, categoryId, restaurantId) {
            return request.post(url + 'api/food/create', {
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                handleAs: 'json',
                data: JSON.stringify({
                    "name": name,
                    "price": price,
                    "categoryId": categoryId,
                    "restaurantId": restaurantId
                })
            })
        },
        updateFood: function (id, name, price, categoryId, restaurantId) {
            return request.post(url + 'api/food/update', {
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                handleAs: 'json',
                data: JSON.stringify({
                    "id": id,
                    "name": name,
                    "price": price,
                    "categoryId": categoryId,
                    "restaurantId": restaurantId
                })
            })
        },
        deleteFood: function (id) {
            return request.post(url + 'api/food/delete', {
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                handleAs: 'json',
                data: JSON.stringify({
                    "id": id
                })
            })
        }
        // >>>>>>>>>>>>>>>>>>>> end food <<<<<<<<<<<<<<<<<<<<

    }
})