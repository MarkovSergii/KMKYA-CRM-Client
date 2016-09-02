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
        },
        {
            title:"Виды доступа",
            link:"main.admin.access_type",
            icon:"fa-dashboard"
        },
        {
            title:"Пользователи",
            link:"main.admin.users",
            icon:"fa-dashboard"
        },
        {
            title:"Базы данных",
            link:"main.admin.databases",
            icon:"fa-dashboard"
        },
        {
            title: "Адреса",
            link: "main.admin.address",
            icon: "fa-dashboard",
            have_subitems: true,
            subitems: [
                {
                    title:"Страны",
                    link:"main.admin.country",
                    icon:"fa-dashboard"
                },
                {
                    title:"Области",
                    link:"main.admin.oblast",
                    icon:"fa-dashboard"
                },
                {
                    title:"Города",
                    link:"main.admin.city",
                    icon:"fa-dashboard"
                }
            ]
        }
        
    ];
};

kmkya_client.controller('adminCtrl',adminCtrl);