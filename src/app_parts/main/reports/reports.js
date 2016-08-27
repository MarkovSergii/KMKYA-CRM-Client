/**
 * Created by user on 31.07.2016.
 */
var reportsCtrl = function($scope,$state,$rootScope,sweetAlert) {
    $rootScope.mainMenu = [
        {
            title:"Финансовый отчет №1",
            link:"main.reports.report1({access_id:1})",
            icon:"fa-dashboard"
        },
        {
            title:"Финансовый отчет №2",
            link:"main.reports.report2({access_id:2})",
            icon:"fa-dashboard"
        },
        {
            title:"Финансовый отчет №3",
            link:"main.reports.report3({access_id:3})",
            icon:"fa-dashboard"
        }
    ];
    // система проверки доступа в отчетах
    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, options){
            if (($rootScope.user.type != 'admin') && (toState.name.includes('main.reports.')) )
            {
                if (!R.contains(parseInt(toParams.access_id),$rootScope.user.permission)){
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

kmkya_client.controller('reportsCtrl',reportsCtrl);