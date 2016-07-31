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

