/**
 * Created by user on 31.07.2016.
 */
var reportsCtrl = function($scope,$state,$rootScope) {
    $rootScope.mainMenu = [
        {
            title:"Отчет 1",
            link:"main.admin.direction_category",
            icon:"fa-dashboard"
        },
        {
            title:"Отчет 2",
            link:"main.admin.exhibitions",
            icon:"fa-dashboard"
        }
    ];
};

kmkya_client.controller('reportsCtrl',reportsCtrl);