/**
 * Created by user on 24.07.2016.
 */

var kmkya_client = angular.module('kmkya_client',['ui.router']);


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

var authCtrl = function($scope,$state){
    $scope.gg = 'JJJ1';

    $scope.go_main = function()
    {
        $state.go('main');
    }
};


kmkya_client.controller('authCtrl',authCtrl);


/**
 * Created by user on 26.07.2016.
 */
kmkya_client.controller('mainCtrl',function($scope,$state){
    $scope.hh = 'DDD';

    $scope.go_auth = function()
    {
        $state.go('auth');
    }
});