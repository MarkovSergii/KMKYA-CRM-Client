/**
 * Created by user on 31.07.2016.
 */
var dashboardCtrl = function($scope,$state,$rootScope) {
    $rootScope.mainMenu = [
        {
            title:"Статистика",
            link:"main.admin.directions",
            icon:"fa-dashboard"
        },
        {
            title:"Еще что-то ",
            link:"main.admin.exhibitions",
            icon:"fa-dashboard"
        }
    ];
};

kmkya_client.controller('dashboardCtrl',dashboardCtrl);