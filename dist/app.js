var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
    return window._; 
});
/**
 * Created by user on 24.07.2016.
 */

var kmkya_client = angular.module('kmkya_client',[
    'ui.router',
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
    var adminAccess_typeState = {
        name: 'main.admin.access_type',
        url: '/access_type',
        cached:false,
        templateUrl: 'app_parts/main/admin/access_type/access_type.html',
        controller: 'admin_access_typeCtrl'
    };
    var adminUsersState = {
        name: 'main.admin.users',
        url: '/users',
        cached:false,
        templateUrl: 'app_parts/main/admin/users/users.html',
        controller: 'admin_usersCtrl'
    };

    var adminCityState = {
        name: 'main.admin.city',
        url: '/city',
        cached:false,
        templateUrl: 'app_parts/main/admin/city/city.html',
        controller: 'admin_cityCtrl'
    };

    var adminCountryState = {
        name: 'main.admin.country',
        url: '/country',
        cached:false,
        templateUrl: 'app_parts/main/admin/country/country.html',
        controller: 'admin_countryCtrl'
    };

    var adminDatabase_categoryState = {
        name: 'main.admin.database_category',
        url: '/database_category',
        cached:false,
        templateUrl: 'app_parts/main/admin/database_category/database_category.html',
        controller: 'admin_database_categoryCtrl'
    };

    var adminDatabasesState = {
        name: 'main.admin.databases',
        url: '/databases',
        cached:false,
        templateUrl: 'app_parts/main/admin/databases/databases.html',
        controller: 'admin_databasesCtrl'
    };

    var adminOblastState = {
        name: 'main.admin.oblast',
        url: '/oblast',
        cached:false,
        templateUrl: 'app_parts/main/admin/oblast/oblast.html',
        controller: 'admin_oblastCtrl'
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
    $stateProvider.state(adminUsersState);
    $stateProvider.state(adminAccess_typeState);
    $stateProvider.state(adminCityState);
    $stateProvider.state(adminCountryState);
    $stateProvider.state(adminDatabase_categoryState);
    $stateProvider.state(adminDatabasesState);
    $stateProvider.state(adminOblastState);
 
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


/**
 * Created by user on 30.07.2016.
 */

kmkya_client.constant('UrlConfig', {
    serverUrl : 'http://93.171.158.114',
    socketUrl : 'http://93.171.158.114',
    
    //socketUrl:'http://127.0.0.1',
    //serverUrl : 'http://127.0.0.1',
    
    socketPort:'3001',    
    serverPort : '3000'
});
/**
 * Created by user on 27.08.2016.
 */
kmkya_client.service('access', function ($http,UrlConfig,$q) {

 
    this.getAccessForUserById = function(id)
    {
        return $q(function(resolve, reject) {

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/access/byUserId/'+id)
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

    this.delete = function(id)
    {
        
    };

    this.insert = function(access)
    {

    };

    return this;
});

/**
 * Created by user on 27.08.2016.
 */

kmkya_client.service('access_type', function ($http,UrlConfig,$q) {

    this.selectAll = function()
    {
        return $q(function(resolve, reject) {

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/access_types/all')
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
        return $q(function(resolve, reject) {

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/access_types/'+id+'/select')
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

    this.update = function(access_type)
    {
        return $q(function(resolve, reject) {

           
                $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/access_types/'+access_type.id+'/update',access_type)
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

    this.add = function(access_type)
    {
        return $q(function(resolve, reject) {


            $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/access_types/insert',access_type)
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

    this.delete = function(id,access_type_id)
    {
        return $q(function(resolve, reject) {
            $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/exhibitionCategory/'+id+'/delete',{access_type_id:access_type_id})
                .then(function(response){
                    if (response.status == 200)
                    {
                        return resolve( {error:false});
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




    return this;
});


/**
 * Created by user on 29.08.2016.
 */
kmkya_client.service('address', function ($http,UrlConfig,$q) {


    this.getCountries = function()
    {
        return $q(function(resolve, reject) {

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/country/all/')
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
    this.getCountryById = function(id)
    {
        return $q(function(resolve, reject) {

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/country/'+id+'/select')
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

    this.getOblast = function(id)
    {
        return $q(function(resolve, reject) {

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/oblast/all')
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

    this.getCities = function(id)
    {
        return $q(function(resolve, reject) {

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/city/all')
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
    
    return this;
});

/**
 * Created by user on 03.08.2016.
 */

kmkya_client.service('direction_category_service', function ($http,UrlConfig,$q,Upload) {

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
        return $q(function(resolve, reject) {

            if (direction_category.new_logo)
            {
                direction_category.logo = direction_category.new_logo;
                Upload.upload({
                    url: UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/exhibitionCategory/'+direction_category.id+'/update',
                    data: {name: direction_category.name, file: direction_category.logo}
                })
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
            }
            else
            {
                $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/exhibitionCategory/'+direction_category.id+'/update',direction_category)
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
            }


        });
    };

    this.add = function(direction_category)
    {
        return $q(function(resolve, reject) {
                Upload.upload({
                    url: UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/exhibitionCategory/insert',
                    data: {name: direction_category.name, file: direction_category.logo}
                })
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
    
    this.delete = function(id,direction_category_id)
    {
        return $q(function(resolve, reject) {
            $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/exhibitionCategory/'+id+'/delete',{direction_category_id:direction_category_id})
                .then(function(response){
                    if (response.status == 200)
                    {
                        return resolve( {error:false});
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
    
    


        return this;
});


/**
 * Created by user on 28.07.2016.
 */

kmkya_client.factory('SocketIO', function ($rootScope,UrlConfig) {

    var socket = io.connect(UrlConfig.socketUrl+':'+UrlConfig.socketPort);
    return socket;

});
/**
 * Created by user on 27.08.2016.
 */

kmkya_client.service('user', function ($http,UrlConfig,$q) {

    this.selectAll = function()
    {
        return $q(function(resolve, reject) {

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/user/all')
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
        return $q(function(resolve, reject) {

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/user/'+id+'/select')
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


    return this;
});


/**
 * Created by user on 26.07.2016.
 */

var authCtrl = function($scope,$state,$cookies,UrlConfig,$http,toastr,$rootScope,access){


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

                                access.getAccessForUserById(response.data.user.id)
                                    .then(function(user_access_responce){
                                        if (user_access_responce.data.error)
                                        {

                                        }
                                        else {
                                            $rootScope.user.permission = user_access_responce.data;
                                        }
                                    });

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

var mainCtrl = function($scope,$state,toastr,sweetAlert,ngDialog,Upload,$cookies,$http,$rootScope,UrlConfig,SocketIO,access) {


    
    SocketIO.emit('join','hello');

    SocketIO.on('join',function(msg){
        console.log(msg);
    });

    $scope.controllerBody = function()
    {
        $scope.logout = function()
        {
            $cookies.remove('token');
            $state.go('auth');
        };

        // только зона Администратора
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options){
                
                if ((toState.name == 'main.admin') && ($rootScope.user.type != 'admin'))
                {
                    
                    event.preventDefault();
                    $rootScope.curentUserState = fromState.name;
                    sweetAlert.swal("Error", "У вас нет доступа к этому разделу" ,"error");
                }
            });
        $rootScope.curentUserState = $state.current.name;
        $rootScope.UrlConfig = UrlConfig;

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
                        // get user permission
                        access.getAccessForUserById(response.data.user.id)
                            .then(function(user_access_responce){
                                if (user_access_responce.data.error)
                                {
                                    
                                }
                                else {
                                    $rootScope.user.permission = user_access_responce.data; 
                                }
                            });

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
            title:"Сезоны",
            link:"main.admin.seasons",
            icon:"fa-dashboard"
        },
        {
            title:"Выставки",
            link:"main.admin.exhibitions",
            icon:"fa-dashboard"
        },
        {
            title:"Виды доступа",
            link:"main.admin.access_type",
            icon:"fa-dashboard"
        },
        {
            title:"Пользователи",
            link:"main.admin.users",
            icon:"fa-dashboard"
        },
        {
            title:"Категории БД",
            link:"main.admin.database_category",
            icon:"fa-dashboard"
        },
        {
            title:"Базы данных",
            link:"main.admin.databases",
            icon:"fa-dashboard"
        },
        {
            title: "Адреса",
            link: "main.admin.address",
            icon: "fa-dashboard",
            have_subitems: true,
            subitems: [
                {
                    title:"Страны",
                    link:"main.admin.country",
                    icon:"fa-dashboard"
                },
                {
                    title:"Области",
                    link:"main.admin.oblast",
                    icon:"fa-dashboard"
                },
                {
                    title:"Города",
                    link:"main.admin.city",
                    icon:"fa-dashboard"
                }
            ]
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
var admin_access_typeCtrl = function($scope,$state) {

};

kmkya_client.controller('admin_access_typeCtrl',admin_access_typeCtrl);
var admin_cityCtrl = function($scope,$state,address) {
    address.getCities()
        .then(function(list){
            if (list.error)
            {
                alert(list.message)
            }
            else
            {
                $scope.city_list = list.data;
            }
        })
        .catch(function(error){
            alert(error.message)
        });
};

kmkya_client.controller('admin_cityCtrl',admin_cityCtrl);
var admin_countryCtrl = function($scope,$state,address) {

    address.getCountries()
        .then(function(list){
            if (list.error)
            {
                alert(list.message)
            }
            else
            {
                $scope.country_list = list.data;
            }
        })
        .catch(function(error){
            alert(error.message)
        });

};

kmkya_client.controller('admin_countryCtrl',admin_countryCtrl);
var admin_databasesCtrl = function($scope,$state) {

};

kmkya_client.controller('admin_databasesCtrl',admin_databasesCtrl);
var admin_database_categoryCtrl = function($scope,$state) {

};

kmkya_client.controller('admin_database_categoryCtrl',admin_database_categoryCtrl);

var addDirectionCategoryCtrl = function($scope,direction_category_service)
{
    
    $scope.addCategory = function()
    {
        direction_category_service.add($scope.category)
            .then(function (newRecorcd){
                if (newRecorcd.error)
                {
                    alert(newRecorcd.message)
                }
                else
                {
                    $scope.direction_category_list.push(newRecorcd.data);
                    $scope.closeThisDialog();
                }
            })
            .catch(function(error){
            alert(error.message)
            });
    }   
};

var editDirectionCategoryCtrl = function($scope,direction_category_service)
{
    $scope.saveCategory = function(direction_category)
    {
        direction_category_service.update(direction_category)
            .then(function (updatedRecorcd){
                if (updatedRecorcd.error)
                {
                    alert(updatedRecorcd.message)
                }
                else
                {
                    // найти в списке и перезаписать
                    for (var i =0;i<$scope.direction_category_list.length;i++)
                    {
                        if ($scope.direction_category_list[i].id == updatedRecorcd.data.id)
                        {
                            $scope.direction_category_list[i] = updatedRecorcd.data;
                            $scope.closeThisDialog();
                            break;
                        }
                    }
                    //$scope.direction_category_list.  push(newRecorcd.data);

                }
            })
            .catch(function(error){
                alert(error.message)
            });
    }
};



var admin_direction_categoryCtrl = function($scope,$state,direction_category_service,ngDialog,sweetAlert,_) {

    $scope.direction_category = {};

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

    $scope.addDirection_category = function()
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/direction_category/dialog/add.html',
            controller: 'addDirectionCategoryCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            closeByDocument:false,
            overlay: true
        });
    };
    $scope.editDirection_category = function(direction_category)
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/direction_category/dialog/edit.html',
            controller: 'editDirectionCategoryCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            data : angular.copy(direction_category),
            closeByDocument:false,
            overlay: true
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



                direction_category_service.delete(direction_category.id,result)
                    .then(function () {
                        $scope.direction_category_list.splice(R.findIndex(R.propEq('id', direction_category.id))($scope.direction_category_list),1);
                        sweetAlert.swal(
                            {
                                title: 'Успешно',
                                text: "Категория(дирекция) удалена",
                                type: 'success',
                                timer:2000
                            }
                        ).done();
                    })
                    .catch(function(error){
                        alert(error.message)
                    });

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
var admin_oblastCtrl = function($scope,$state,address) {
    address.getOblast()
        .then(function(list){
            if (list.error)
            {
                alert(list.message)
            }
            else
            {
                $scope.oblast_list = list.data;
            }
        })
        .catch(function(error){
            alert(error.message)
        });
};

kmkya_client.controller('admin_oblastCtrl',admin_oblastCtrl);
/**
 * Created by user on 03.08.2016.
 */
var admin_seasonsCtrl = function($scope,$state) {

};

kmkya_client.controller('admin_seasonsCtrl',admin_seasonsCtrl);
var admin_usersCtrl = function($scope,$state) {

};

kmkya_client.controller('admin_usersCtrl',admin_usersCtrl);

var reports1Ctrl = function($scope,$state) {

};

kmkya_client.controller('reports1Ctrl',reports1Ctrl);

var reports2Ctrl = function($scope,$state) {

};

kmkya_client.controller('reports2Ctrl',reports2Ctrl);

var reports3Ctrl = function($scope,$state) {

};

kmkya_client.controller('reports3Ctrl',reports3Ctrl);