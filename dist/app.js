/**
 * Created by user on 24.07.2016.
 */

var kmkya_client = angular.module('kmkya_client',[
    'ui.router',
    'btford.socket-io',
    'ngAnimate',
    'toastr',
    '19degrees.ngSweetAlert2',
    'ngDialog',
    'ngCookies',
    'ngFileUpload',
    'ui.grid',
    'ui.grid.selection'
    ]);


/**
 * Created by user on 29.07.2016.
 */

kmkya_client.config(['$httpProvider',function($httpProvider) {

    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header used to identify ajax call  that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.interceptors.push(function($rootScope) {
        return {
            'request': function(config) {
                config.headers['authorization'] = $rootScope.token;     //TODO: заменить на подстановку токена из куков
                return config;
            }
        };
    });

}]);
/**
 * Created by user on 29.07.2016.
 */

kmkya_client.config(function($stateProvider,$urlRouterProvider) {
    var authState = {
        name: 'auth',
        url: '/auth',
        cached:false,
        templateUrl: '/app_parts/auth/auth.html',
        controller: 'authCtrl'
    };

    var mainState = {
        name: 'main',
        url: '/main',
        cached:false,
        templateUrl: '/app_parts/main/main.html',
        controller: 'mainCtrl'

    };

    var dashboardState = {
        name: 'main.dashboard',
        url: '/dashboard',
        cached:false,
        templateUrl: '/app_parts/main.dashboard/dashboard.html',
        controller: 'dashboardCtrl'

    };
    
    var adminState = {
        name: 'main.admin',
        url: '/admin',
        cached:false,
        templateUrl: '/app_parts/main.admin/admin.html',
        controller: 'adminCtrl'

    };

    var databaseState = {
        name: 'main.database',
        url: '/database',
        cached:false,
        templateUrl: '/app_parts/main.database/database.html',
        controller: 'databaseCtrl'

    };

    var reportsState = {
        name: 'main.reports',
        url: '/reports',
        cached:false,
        templateUrl: '/app_parts/main.reports/reports.html',
        controller: 'reportsCtrl'

    };    
    
    
    
    
    

    $urlRouterProvider.when('', '/auth');
    $urlRouterProvider.otherwise('/auth');


    $stateProvider.state(authState);
    $stateProvider.state(mainState);
    $stateProvider.state(adminState);
    $stateProvider.state(databaseState);
    $stateProvider.state(reportsState);
    $stateProvider.state(dashboardState);
});


/**
 * Created by user on 30.07.2016.
 */

kmkya_client.constant('UrlConfig', {
    serverUrl : '93.171.158.114',
    serverPort : '3000'
});
/**
 * Created by user on 28.07.2016.
 */

kmkya_client.factory('SocketIO', function (socketFactory) {
    return socketFactory();
});
/**
 * Created by user on 26.07.2016.
 */

var authCtrl = function($scope,$state,$cookies,UrlConfig,$http,toastr,$rootScope){


    $scope.login = function(auth)
    {
        if ((!auth) || (!auth.email))
        {
            toastr.error('Неправельный email','ERROR!');
        }
        else
        {
            if (!auth.password)
            {
                toastr.error('Пароль не может быть пустым','ERROR!');
            }
            else
            {

                $http.post('http://'+UrlConfig.serverUrl+":"+UrlConfig.serverPort+'/api/login',auth)
                    .then(function(response){
                        if (response.status == 200)
                        {
                            if (response.data.error)
                            {
                                toastr.error(response.data.message,'ERROR!');
                            }
                            else
                            {
                                //save cookie and go to main
                                var now = new Date();
                                var exp = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());

                                $cookies.put('token', response.data.token,{expires :exp});
                                $rootScope.user = response.data.user;
                                $rootScope.token = response.data.token;
                                $state.go('main');
                            }

                        }
                        else
                        {
                            toastr.error('Ошибка на сервере код ответа: '+response.status+' '+response.statusText,'ERROR!');
                        }
                        console.log(response);
                    })
                    .catch(function(){
                        console.log('server error');
                    });


            }
        }
    }
};



kmkya_client.controller('authCtrl',authCtrl);


/**
 * Created by user on 28.07.2016.
 */

var mainCtrl = function($scope,$state,toastr,sweetAlert,ngDialog,Upload,$cookies,$http,$rootScope,UrlConfig) {


    $scope.controllerBody = function()
    {
        $scope.logout = function()
        {
            $cookies.remove('token');
            $state.go('auth');
        };

    /*    toastr.success('Hello world!', 'Toastr fun!');
        sweetAlert.swal("Here's a message");
        $scope.hh = 'main';

        $scope.openDialog = function()
        {
            ngDialog.open(
                {
                    template: 'app_parts/main/dialog/popupTmpl.html',
                    className: 'ngdialog-theme-default',
                    controller: 'SomeController'
                });
        };


        $scope.goadmin = function()
        {
            $state.go('main.admin');
        };

        $scope.gomain = function()
        {
            $state.go('main');
        };

        $scope.go_auth = function()
        {
            $state.go('auth');
        }*/

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options){

                if (toState.name == 'main.admin')
                {
                    event.preventDefault();
                    sweetAlert.swal("Error", "У вас нет доступа к этому разделу" ,"error");
                }
            });

        $state.go('main.dashboard');
    };

    if (!$cookies.get('token'))
    {
        $state.go('auth');
    }
    else
    {
        if (!$rootScope.user)
        {
            // get user by token
            $http.post('http://'+UrlConfig.serverUrl+":"+UrlConfig.serverPort+'/api/token',{token:$cookies.get('token')})
                .then(function(response){
                    if (response.data.error)
                    {
                        toastr.error(response.data.message,'ERROR!');
                        $state.go('auth');
                    }
                    else
                    {
                        //save cookie and go to main
                        $rootScope.user = response.data.user;
                        $rootScope.token = $cookies.get('token');
                        $scope.controllerBody();
                    }
                })
                .catch(function(){
                    toastr.error('Ошибка на сервере код ответа: '+response.status+' '+response.statusText,'ERROR!');
                    $state.go('auth');
                })
        }
        else
        {
            $scope.controllerBody();
        }

    }
};



kmkya_client.controller('mainCtrl',mainCtrl);



/**
 * Created by user on 30.07.2016.
 */
var adminCtrl = function($scope,$state) {

};

kmkya_client.controller('adminCtrl',adminCtrl);
/**
 * Created by user on 31.07.2016.
 */
var dashboardCtrl = function($scope,$state) {

};

kmkya_client.controller('dashboardCtrl',dashboardCtrl);
/**
 * Created by user on 31.07.2016.
 */
var databaseCtrl = function($scope,$state) {

};

kmkya_client.controller('databaseCtrl',databaseCtrl);
/**
 * Created by user on 31.07.2016.
 */
var reportsCtrl = function($scope,$state) {

};

kmkya_client.controller('reportsCtrl',reportsCtrl);