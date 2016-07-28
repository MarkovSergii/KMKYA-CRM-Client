/**
 * Created by user on 24.07.2016.
 */

var kmkya_client = angular.module('kmkya_client',[
    'ui.router',
    'btford.socket-io',
    'ngAnimate',
    'toastr',
    '19degrees.ngSweetAlert2'
    ]);


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


kmkya_client.factory('SocketIO', function (socketFactory) {
    return socketFactory();
})
/**
 * Created by user on 26.07.2016.
 */
kmkya_client.controller('authCtrl',function($scope,$state){
    $scope.hh = 'auth';

    $scope.go_main = function()
    {
        $state.go('main');
    }
});
/**
 * Created by user on 28.07.2016.
 */
/**
 * Created by user on 26.07.2016.
 */
kmkya_client.controller('mainCtrl',function($scope,$state,toastr,sweetAlert){

    toastr.success('Hello world!', 'Toastr fun!');
    sweetAlert.swal("Here's a message");
    $scope.hh = 'main';

    $scope.go_auth = function()
    {
        $state.go('auth');
    }
});