/**
 * Created by user on 30.07.2016.
 */
var adminCtrl = function($scope,$state,$rootScope) {
    $rootScope.mainMenu = [
        {
            title:"Дирекции (Категории)",
            link:"main.admin.direction_category",
            icon:"fa-dashboard"
        },
        {
            title:"Сезоны",
            link:"main.admin.seasons",
            icon:"fa-dashboard"
        },
        {
            title:"Выставки",
            link:"main.admin.exhibitions",
            icon:"fa-dashboard"
        }
    ];
};

kmkya_client.controller('adminCtrl',adminCtrl);