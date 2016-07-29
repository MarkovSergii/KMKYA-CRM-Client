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

    $urlRouterProvider.when('', '/auth');
    $urlRouterProvider.otherwise('/auth');


    $stateProvider.state(authState);
    $stateProvider.state(mainState);
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

var authCtrl = function($scope,$state,$cookies){
    $scope.hh = 'auth';

    $scope.go_main = function()
    {
        $state.go('main');
    }
};



kmkya_client.controller('authCtrl',authCtrl);


/**
 * Created by user on 28.07.2016.
 */

var mainCtrl = function($scope,$state,toastr,sweetAlert,ngDialog,Upload){

    toastr.success('Hello world!', 'Toastr fun!');
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

    $scope.go_auth = function()
    {
        $state.go('auth');
    }
};


var SomeController = function($scope){
    $scope.hhgg = 'super';
};

kmkya_client.controller('mainCtrl',mainCtrl);
kmkya_client.controller('SomeController',SomeController);


