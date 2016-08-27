/**
 * Created by user on 29.07.2016.
 */

kmkya_client.config(function($stateProvider,$urlRouterProvider) {
// AUTH ------------------------------------------------------------------------    
    var authState = {
        name: 'auth',
        url: '/auth',
        cached:false,
        templateUrl: 'app_parts/auth/auth.html',
        controller: 'authCtrl'
    };
    
// MAIN ------------------------------------------------------------------------
    var mainState = {
        name: 'main',
        url: '/main',
        cached:false,
        templateUrl: 'app_parts/main/main.html',
        controller: 'mainCtrl'
    };
    
// dashboard -------------------------------------------------------------------
    var dashboardState = {
        name: 'main.dashboard',
        url: '/dashboard',
        cached:false,
        templateUrl: 'app_parts/main/dashboard/dashboard.html',
        controller: 'dashboardCtrl'
    };
    
// admin -----------------------------------------------------------------------    
    var adminState = {
        name: 'main.admin',
        url: '/admin',
        cached:false,
        templateUrl: 'app_parts/main/admin/admin.html',
        controller: 'adminCtrl'
    };
    var admin_seasonsCtrl = {
        name: 'main.admin.seasons',
        url: '/seasons',
        cached:false,
        templateUrl: 'app_parts/main/admin/seasons/seasons.html',
        controller: 'admin_seasonsCtrl'
    };
    var adminCategoryState = {
        name: 'main.admin.direction_category',
        url: '/direction_category',
        cached:false,
        templateUrl: 'app_parts/main/admin/direction_category/direction_category.html',
        controller: 'admin_direction_categoryCtrl'
    };
    var adminExhibitionsState = {
        name: 'main.admin.exhibitions',
        url: '/exhibitions',
        cached:false,
        templateUrl: 'app_parts/main/admin/exhibitions/exhibitions.html',
        controller: 'admin_exhibitionsCtrl'
    };    
    
// database --------------------------------------------------------------------
    var databaseState = {
        name: 'main.database',
        url: '/database',
        cached:false,
        templateUrl: 'app_parts/main/database/database.html',
        controller: 'databaseCtrl'

    };
    
// reports ---------------------------------------------------------------------
    var reportsState = {
        name: 'main.reports',
        url: '/reports',
        cached:false,
        templateUrl: 'app_parts/main/reports/reports.html',
        controller: 'reportsCtrl'

    };
    var reports1 = {
        name: 'main.reports.report1',
        url: '/reports/1/:access_id',
        cached:false,
        templateUrl: 'app_parts/main/reports/report1/report1.html',
        controller: 'reports1Ctrl'

    };
    var reports2 = {
        name: 'main.reports.report2',
        url: '/reports/2/:access_id',
        cached:false,
        templateUrl: 'app_parts/main/reports/report2/report2.html',
        controller: 'reports2Ctrl'

    };
    var reports3 = {
        name: 'main.reports.report3',
        url: '/reports/3/:access_id',
        cached:false,
        templateUrl: 'app_parts/main/reports/report3/report3.html',
        controller: 'reports3Ctrl'

    };




    $urlRouterProvider.when('', '/auth');
    $urlRouterProvider.otherwise('/auth');


    $stateProvider.state(authState);
//-------------------------------------------------------------------------------
    $stateProvider.state(mainState);
//-------------------------------------------------------------------------------
    $stateProvider.state(adminState);
    $stateProvider.state(admin_seasonsCtrl);
    $stateProvider.state(adminCategoryState);
    $stateProvider.state(adminExhibitionsState);
//-------------------------------------------------------------------------------
    $stateProvider.state(databaseState);
//-------------------------------------------------------------------------------
    $stateProvider.state(reportsState);
    $stateProvider.state(reports1);
    $stateProvider.state(reports2);
    $stateProvider.state(reports3);
//-------------------------------------------------------------------------------
    $stateProvider.state(dashboardState);
//-------------------------------------------------------------------------------
});

