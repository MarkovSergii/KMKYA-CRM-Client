/**
 * Created by user on 28.07.2016.
 */

var mainCtrl = function($scope,$state,toastr,sweetAlert,ngDialog,Upload,$cookies,$http,$rootScope,UrlConfig) {


    $scope.controllerBody = function()
    {
     /*   toastr.success('Hello world!', 'Toastr fun!');
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
        }*/ $state.go('main.dashboard');
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
                        var now = new Date();
                        var exp = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());

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


var SomeController = function($scope){
    $scope.hhgg = 'super';
};

kmkya_client.controller('mainCtrl',mainCtrl);
kmkya_client.controller('SomeController',SomeController);


