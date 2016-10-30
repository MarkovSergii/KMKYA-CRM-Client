/**
 * Created by user on 31.07.2016.
 */
var databaseCtrl = function($scope,$state,$rootScope,sweetAlert) {
    $rootScope.mainMenu = [ // TODO: заменить на генерирование меню из таблицы дирекций
        {
            title:"AGRO",
            link:"main.admin.direction_category",
            icon:"fa-dashboard",
            have_subitems:true,
            subitems:[
                {
                    title:"Потенциальные участники",
                    link:"main.database.firms({direction_id:1})",
                    icon:"fa-database"
                },
                {
                    title:"Участие в ",
                    link:"main.uch",
                    have_subitems:true,
                    icon:"fa-money",
                    subitems:[
                        {
                            title:"Fashion 2016 (осень)",
                            link:"main.database.uch({exhibition_id:1})",
                            icon:"fa-database"
                        }
                    ]
                }
            ]
        },
        {
            title:"FASHION",
            link:"main.admin.exhibitions",
            icon:"fa-dashboard"
        },
        {
            title:"BUILD",
            link:"main.admin.direction_category",
            icon:"fa-dashboard"
        },
        {
            title:"MEBEL",
            link:"main.admin.exhibitions",
            icon:"fa-dashboard"
        },
        {
            title:"RESTORAN/IFFIP",
            link:"main.admin.direction_category",
            icon:"fa-dashboard"
        },
        {
            title:"JEWEL",
            link:"main.admin.exhibitions",
            icon:"fa-dashboard"
        }
    ];


    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, options){
            if (($rootScope.user.type != 'admin') && (toState.name.includes('main.database.firms')) )
            {
                if (!R.contains(parseInt(toParams.direction_id),$rootScope.user.directions)){
                    event.preventDefault();
                    $rootScope.curentUserState = fromState.name;
                    sweetAlert.swal("Error", "У вас нет доступа к этому разделу" ,"error");
                }
                else
                {
                    $rootScope.curentUserState = toState.name;
                }
            }
            if (($rootScope.user.type != 'admin') && (toState.name.includes('main.database.uch')) )
            {
                if (!R.contains(parseInt(toParams.direction_id),$rootScope.user.exhibitions)){
                    event.preventDefault();
                    $rootScope.curentUserState = fromState.name;
                    sweetAlert.swal("Error", "У вас нет доступа к этому разделу" ,"error");
                }
                else
                {
                    $rootScope.curentUserState = toState.name;
                }
            }


        });



};

kmkya_client.controller('databaseCtrl',databaseCtrl);