require([
    'dojo/on',
    'dojo/json',
    'js/jsonQuery.js',
    'widget/restaurant/tableRestaurant',
    'widget/restaurant/formRestaurant',
    'widget/menu/tableMenu',
    'widget/menu/formMenu',
    'dojo/request/xhr',
    'dojo/domReady!'
], function (on, json, jsonQuery, tableRestaurant, formRestaurant, tableMenu, formMenu, xhr) {
    xhr('https://gdev.geotalent.co.th/Training/api/restauranttype/delete', {
        method: 'POST',
        handleAs: 'json',
        headers: { 'X-AspNet-Version': '4.0.30319' },
        data: {
            "id": 16
        }
    }).then(function (data) {
        console.log(data)
    }, function (err) {
        console.log(err)
    })
    // jsonQuery.getRestaurantType().then(function (dataRestaurantType) {
    //     let dataLUTResType = json.parse(dataRestaurantType, true).result
    //     jsonQuery.getRestaurant().then(function (dataRestaurant) {
    //         let dataTblRes = json.parse(dataRestaurant, true).result

    //         // restaurant
    //         let _tableRestaurant = new tableRestaurant({
    //             dataType: dataLUTResType,
    //             data: dataTblRes
    //         }, 'tableRestaurant')

    //         let _formRestaurant = new formRestaurant({
    //             dataType: dataLUTResType
    //         }, 'formRestaurant')

    //         let editIndexRes
    //         on(_tableRestaurant, 'Click_btnEdit', function (item, index) {
    //             _formRestaurant.setForm(item)
    //             editIndexRes = index
    //         })

    //         on(_tableRestaurant, 'Click_btnDelete', function (index) {
    //             // editIndexRes = editIndexRes == index ? null : editIndexRes
    //             // jsonQuery.deleteRestaurant(index)
    //             // _tableRestaurant.createTable()
    //             // alert('ลบข้อมูลเรียบร้อย')
    //             jsonQuery.deleteRestaurant()
    //         })
    //     })
    // })



    // // view menu
    // let _tableMenu
    // let _formMenu
    // on(_tableRestaurant, 'Click_btnViewMenu', function (item) {

    //     // menu
    //     if (_tableMenu != undefined) {
    //         _tableMenu.destroyRecursive(true)
    //     }
    //     if (_formMenu != undefined) {
    //         _formMenu.destroyRecursive(true)
    //     }

    //     _tableMenu = new tableMenu({
    //         dataType: dataLUTMenuType,
    //         data: dataTblMenu,
    //         nameRes: item.name
    //     }, 'tableMenu')

    //     // console.log(_tableMenu.domNode)

    //     _formMenu = new formMenu({
    //         dataType: dataLUTMenuType
    //     }, 'formMenu')

    //     let editIndexMenu
    //     on(_tableMenu, 'Click_btnEdit', function (item, index) {
    //         _formMenu.setForm(item)
    //         editIndexMenu = index
    //     })

    //     on(_tableMenu, 'Click_btnDelete', function (index) {
    //         editIndexMenu = editIndexMenu == index ? null : editIndexMenu
    //         jsonQuery.deleteMenu(index)
    //         _tableMenu.createTable()
    //         alert('ลบข้อมูลเรียบร้อย')
    //     })

    //     let currentIdMenu = dataTblMenu.length
    //     on(_tableMenu, 'Click_btnAddNewRow', function () {
    //         let dataFormMenu = _formMenu.getForm()
    //         jsonQuery.addMenu(++currentIdMenu, dataFormMenu)
    //         _tableMenu.createTable()
    //         alert('เพิ่มข้อมูลเรียบร้อย')
    //     })

    //     on(_formMenu, 'Click_btnSave', function () {
    //         if (editIndexMenu != null) {
    //             if (confirm('ต้องการบันทึกข้อมูลหรือไม่')) {
    //                 let dataFormMenu = _formMenu.getForm()
    //                 jsonQuery.updateMenu(editIndexMenu, dataFormMenu)
    //                 _tableMenu.createTable()
    //                 alert('บันทึกข้อมูลเรียบร้อย')
    //             }
    //         }
    //     })

    //     on(_formMenu, 'Click_btnCancel', function () {
    //         editIndexMenu = null
    //     })
    // })

    // let currentIdRes = dataTblRestaurant.length
    // on(_tableRestaurant, 'Click_btnAddNewRow', function () {
    //     let dataFormRestaurant = _formRestaurant.getForm()
    //     jsonQuery.addRestaurant(++currentIdRes, dataFormRestaurant)
    //     _tableRestaurant.createTable()
    //     alert('เพิ่มข้อมูลเรียบร้อย')
    // })

    // on(_formRestaurant, 'Click_btnSave', function () {
    //     if (editIndexRes != null) {
    //         if (confirm('ต้องการบันทึกข้อมูลหรือไม่')) {
    //             let dataFormRestaurant = _formRestaurant.getForm()
    //             jsonQuery.updateRestaurant(editIndexRes, dataFormRestaurant)
    //             _tableRestaurant.createTable()
    //             alert('บันทึกข้อมูลเรียบร้อย')
    //         }
    //     }
    // })

    // on(_formRestaurant, 'Click_btnCancel', function () {
    //     editIndexRes = null
    // })
})