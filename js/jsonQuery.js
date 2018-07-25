define([
    'dojo/request'
], function (request) {
    let url = 'https://gdev.geotalent.co.th/Training/'
    return {
        getRestaurantType: function () {
            return request.get(url + 'api/restauranttype/all')
        },
        getRestaurant: function () {
            return request.get(url + 'api/restaurant/all')
        },
        // addRestaurant: function (indexDataRes, dataRes) {
        //     dataTblRestaurant.push({
        //         id: indexDataRes,
        //         name: dataRes.name,
        //         restaurantType: dataRes.restaurantType,
        //         restaurantTypeName: dataRes.restaurantTypeName,
        //         detail: dataRes.detail
        //     })
        // },
        // updateRestaurant: function (indexDataRes, dataRes) {
        //     dataTblRestaurant[indexDataRes].name = dataRes.name
        //     dataTblRestaurant[indexDataRes].restaurantType = dataRes.restaurantType
        //     dataTblRestaurant[indexDataRes].restaurantTypeName = dataRes.restaurantTypeName
        //     dataTblRestaurant[indexDataRes].detail = dataRes.detail
        // },
        deleteRestaurant: function (indexDataRes) {
            // dataTblRestaurant.splice(indexDataRes, 1)
            // request.post(url + 'api/restaurant/update', {
            //     data: {
            //         "id": 16,
            //         "name": "sdf"
            //     }
            // })
        },
        // addMenu: function (indexDataMenu, dataMenu) {
        //     dataTblMenu.push({
        //         id: indexDataMenu,
        //         name: dataMenu.name,
        //         categoryId: dataMenu.categoryId,
        //         categoryName: dataMenu.categoryName,
        //         price: dataMenu.price
        //     })
        // },
        // updateMenu: function (indexDataMenu, dataMenu) {
        //     dataTblMenu[indexDataMenu].name = dataMenu.name
        //     dataTblMenu[indexDataMenu].categoryId = dataMenu.categoryId
        //     dataTblMenu[indexDataMenu].categoryName = dataMenu.categoryName
        //     dataTblMenu[indexDataMenu].price = dataMenu.price
        // },
        // deleteMenu: function (indexDataMenu) {
        //     dataTblMenu.splice(indexDataMenu, 1)
        // }
    }
})