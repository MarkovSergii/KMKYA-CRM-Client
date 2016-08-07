var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
    return window._; 
});
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
    'ui.grid.selection',
    'underscore'
    ]);


/**
 * Created by user on 29.07.2016.
 */

kmkya_client.config(['$httpProvider',function($httpProvider) {

    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header used to identify ajax call  that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.interceptors.push(function($rootScope,$cookies) {
        return {
            'request': function(config) {
                config.headers['authorization'] = $cookies.get('token');
                return config;
            }
        };
    });

}]);
/**
 * Created by user on 29.07.2016.
 */

kmkya_client.config(function($stateProvider,$urlRouterProvider) {
// AUTH ------------------------------------------------------------------------    
    var authState = {
        name: 'auth',
        url: '/auth',
        cached:false,
        templateUrl: '/app_parts/auth/auth.html',
        controller: 'authCtrl'
    };
    
// MAIN ------------------------------------------------------------------------
    var mainState = {
        name: 'main',
        url: '/main',
        cached:false,
        templateUrl: '/app_parts/main/main.html',
        controller: 'mainCtrl'
    };
    
// dashboard -------------------------------------------------------------------
    var dashboardState = {
        name: 'main.dashboard',
        url: '/dashboard',
        cached:false,
        templateUrl: '/app_parts/main/dashboard/dashboard.html',
        controller: 'dashboardCtrl'
    };
    
// admin -----------------------------------------------------------------------    
    var adminState = {
        name: 'main.admin',
        url: '/admin',
        cached:false,
        templateUrl: '/app_parts/main/admin/admin.html',
        controller: 'adminCtrl'
    };
    var adminCategoryState = {
        name: 'main.admin.direction_category',
        url: '/direction_category',
        cached:false,
        templateUrl: '/app_parts/main/admin/direction_category/direction_category.html',
        controller: 'admin_direction_categoryCtrl'
    };
    var adminExhibitionsState = {
        name: 'main.admin.exhibitions',
        url: '/exhibitions',
        cached:false,
        templateUrl: '/app_parts/main/admin/exhibitions/exhibitions.html',
        controller: 'admin_exhibitionsCtrl'
    };    
    
// database --------------------------------------------------------------------
    var databaseState = {
        name: 'main.database',
        url: '/database',
        cached:false,
        templateUrl: '/app_parts/main/database/database.html',
        controller: 'databaseCtrl'

    };
    
// reports ---------------------------------------------------------------------
    var reportsState = {
        name: 'main.reports',
        url: '/reports',
        cached:false,
        templateUrl: '/app_parts/main/reports/reports.html',
        controller: 'reportsCtrl'

    };    
    
    
    
    
    

    $urlRouterProvider.when('', '/auth');
    $urlRouterProvider.otherwise('/auth');


    $stateProvider.state(authState);
    $stateProvider.state(mainState);
    $stateProvider.state(adminState);  
    $stateProvider.state(databaseState);
    $stateProvider.state(adminCategoryState);
    $stateProvider.state(adminExhibitionsState);
    $stateProvider.state(reportsState);
    $stateProvider.state(dashboardState);
});


/**
 * Created by user on 30.07.2016.
 */

kmkya_client.constant('UrlConfig', {
    //serverUrl : 'http://93.171.158.114',
    serverUrl : 'http://127.0.0.1',
    serverPort : '3000'
});
/**
 * Created by user on 03.08.2016.
 */

kmkya_client.service('direction_category_service', function ($http,UrlConfig,$q) {

    this.selectAll = function()
    {
        return $q(function(resolve, reject) {

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/exhibitionCategory/all')
                .then(function(response){
                    if (response.status == 200)
                    {
                        return resolve( {error:false,message:"",data:response.data.data} );
                    }
                    else
                    {
                        return reject( {error:true,message:response.statusText} );
                    }
                })
                .catch(function(error){
                    return reject({error:true,message:error.statusText} );
                });


        });


    };

    this.selectById = function(id)
    {
        return $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/exhibitionCategory/'+id+'/select');
    };

    this.update = function(direction_category)
    {
        return $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/exhibitionCategory/'+direction_category.id+'/update',direction_category);
    };

    this.add = function(direction_category)
    {
        return $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/exhibitionCategory/insert',direction_category);
    };
    
    this.delete = function(id)
    {
        return $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/exhibitionCategory/'+id+'/delete');
    };    
    
    


        return this;
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

                $http.post(UrlConfig.serverUrl+":"+UrlConfig.serverPort+'/api/login',auth)
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

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options){
                
                if ((toState.name == 'main.admin') && ($rootScope.user.type != 'admin'))
                {
                    event.preventDefault();
                    sweetAlert.swal("Error", "У вас нет доступа к этому разделу" ,"error");
                }

                $rootScope.curentUserState = toState.name;
            });
        $rootScope.curentUserState = 'main';
        $rootScope.UrlConfig = UrlConfig;
        // $state.go('main.dashboard');

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
            $http.post(UrlConfig.serverUrl+":"+UrlConfig.serverPort+'/api/token',{token:$cookies.get('token')})
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
var adminCtrl = function($scope,$state,$rootScope) {
    $rootScope.mainMenu = [
        {
            title:"Дирекции (Категории)",
            link:"main.admin.direction_category",
            icon:"fa-dashboard"
        },
        {
            title:"Выставки",
            link:"main.admin.exhibitions",
            icon:"fa-dashboard"
        }
    ];
};

kmkya_client.controller('adminCtrl',adminCtrl);
/**
 * Created by user on 31.07.2016.
 */
var dashboardCtrl = function($scope,$state,$rootScope) {
    $rootScope.mainMenu = [
        {
            title:"Статистика",
            link:"main.admin.direction_category",
            icon:"fa-dashboard"
        },
        {
            title:"Еще что-то ",
            link:"main.admin.exhibitions",
            icon:"fa-dashboard"
        }
    ];
};

kmkya_client.controller('dashboardCtrl',dashboardCtrl);
/**
 * Created by user on 31.07.2016.
 */
var databaseCtrl = function($scope,$state,$rootScope) {
    $rootScope.mainMenu = [ // TODO: заменить на генерирование меню из таблицы дирекций
        {
            title:"AGRO",
            link:"main.admin.direction_category",
            icon:"fa-dashboard",
            have_subitems:true,
            subitems:[
                {
                    title:"БД1",
                    link:"main.db",
                    icon:"fa-dashboard"
                },
                {
                    title:"БД2",
                    link:"main.db",
                    icon:"fa-dashboard"
                },
                {
                    title:"БД3",
                    link:"main.db",
                    icon:"fa-dashboard"
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
};

kmkya_client.controller('databaseCtrl',databaseCtrl);
/**
 * Created by user on 31.07.2016.
 */
var reportsCtrl = function($scope,$state,$rootScope) {
    $rootScope.mainMenu = [
        {
            title:"Отчет 1",
            link:"main.admin.direction_category",
            icon:"fa-dashboard"
        },
        {
            title:"Отчет 2",
            link:"main.admin.exhibitions",
            icon:"fa-dashboard"
        }
    ];
};

kmkya_client.controller('reportsCtrl',reportsCtrl);

var addDirectionCategoryCtrl = function($scope)
{
    
    $scope.addCategory = function()
    {

        alert('add');
        $scope.closeThisDialog();
    }   
};

var editDirectionCategoryCtrl = function($scope)
{

    $scope.saveCategory = function()
    {

        alert('save');
        $scope.closeThisDialog();
    }
};



var admin_direction_categoryCtrl = function($scope,$state,direction_category_service,ngDialog,sweetAlert,_) {
    // get all direction_category
    direction_category_service.selectAll()
        .then(function(list){
            if (list.error)
            {
                alert(list.message)
            }
            else
            {
                $scope.direction_category_list = list.data;
            }
        })
        .catch(function(error){
            alert(error.message)
        });

    $scope.addDirection_category = function(new_direction_category)
    {
        $scope.addDialog = ngDialog.open({
            template: '/app_parts/main/admin/direction_category/dialog/add.html',
            controller: 'addDirectionCategoryCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            overlay: false
        });
    };
    $scope.editDirection_category = function(direction_category)
    {
        $scope.addDialog = ngDialog.open({
            template: '/app_parts/main/admin/direction_category/dialog/edit.html',
            controller: 'editDirectionCategoryCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            overlay: false
        });
    };
    $scope.deleteDirection_category = function(direction_category)
    {

        sweetAlert.swal({
            title: 'Вы уверены?',
            text: "Востановить будет невозможно",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Да удалить!',
            cancelButtonText: 'Нет'
        }).then(function() {

            sweetAlert.swal({
                title: 'Куда привязать элементы удаляемой дирекции' ,
                input: 'select',
                inputOptions: _.object(_.map(_.without($scope.direction_category_list,direction_category), _.values)),
                inputPlaceholder: 'Вибирите дирекцию',
                showCancelButton: true,
                cancelButtonText: 'Отмена',
                inputValidator: function(value) {
                    return new Promise(function(resolve, reject) {
                        if (value != '') {
                            resolve();
                        } else {
                            reject('Ви должны выбрать дирекцию');
                        }
                    });
                }
            }).then(function(result) {

                // TODO: delete category and link all it exhibition to result

                sweetAlert.swal(
                    {
                        title: 'Успешно',
                        text: "Категория(дирекция) удалена"+result,
                        type: 'success',
                        timer:2000
                    }
                ).done();
            }).done();
        }).done();
    };


    
    
};


kmkya_client.controller('admin_direction_categoryCtrl',admin_direction_categoryCtrl);
kmkya_client.controller('addDirectionCategoryCtrl',addDirectionCategoryCtrl);
kmkya_client.controller('editDirectionCategoryCtrl',editDirectionCategoryCtrl);

/**
 * Created by user on 03.08.2016.
 */
var admin_exhibitionsCtrl = function($scope,$state) {

};

kmkya_client.controller('admin_exhibitionsCtrl',admin_exhibitionsCtrl);