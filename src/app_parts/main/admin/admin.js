/**
 * Created by user on 30.07.2016.
 */
var adminCtrl = function($scope,$state,$rootScope) {
    $rootScope.mainMenu = [
        {
            title:"Дирекции (Категории)",
            link:"main.admin.directions",
            icon:"fa-university"
        },
        {
            title:"Сезоны",
            link:"main.admin.seasons",
            icon:"fa-calendar"
        },
        {
            title:"Выставки",
            link:"main.admin.exhibitions",
            icon:"fa-handshake-o"
        },
        {
            title:"Подвыставки",
            link:"main.admin.subexhibitions",
            icon:"fa-list"
        },
        {
            title:"Типы застройки",
            link:"main.admin.squaretypes",
            icon:"fa-cubes"
        },
        {
            title:"Место положение",
            link:"main.admin.places",
            icon:"fa-map-marker"
        },
        {
            title: "Каталоги",
            link: "main.admin.catalogues-list",
            icon: "fa-book",
            noimg: true,
            have_subitems: true,
            subitems: [
                {
                    title:"Список каталогов",
                    link:"main.admin.catalogues",
                    icon:"fa-list-alt"
                },
                {
                    title:"Вопросы",
                    link:"main.admin.questions",
                    icon:"fa-question"
                }
            ]
        },
        {
            title:"Виды доступа",
            link:"main.admin.access_type",
            icon:"fa-key"
        },
        {
            title:"Пользователи",
            link:"main.admin.users",
            icon:"fa-users"
        },
        {
            title: "Адреса",
            link: "main.admin.address",
            icon: "fa-globe",
            noimg: true,
            have_subitems: true,
            subitems: [
                {
                    title:"Страны",
                    link:"main.admin.country",
                    icon:"fa-list-ul"
                },
                {
                    title:"Области",
                    link:"main.admin.oblast",
                    icon:"fa-list-ul"
                },
                {
                    title:"Города",
                    link:"main.admin.city",
                    icon:"fa-list-ul"
                }
            ]
        },
        {
            title:"Временная вкладка",
            link:"main.admin.temp",
            icon:"fa-file-text-o"
        }
        
    ];
};

kmkya_client.controller('adminCtrl',adminCtrl);