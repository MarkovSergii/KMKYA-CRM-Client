/**
 * Created by user on 28.07.2016.
 */

var mainCtrl = function($scope,$state,toastr,sweetAlert,ngDialog,Upload,$cookies,$http,$rootScope,UrlConfig,SocketIO,user_service) {


    
    SocketIO.emit('country');
    SocketIO.emit('oblast');
    SocketIO.emit('city');

    SocketIO.on('country',function(msg){
      $rootScope.ALLcountry = msg ;
    });
    SocketIO.on('oblast',function(msg){
        $rootScope.ALLoblast = msg ;
    });
    SocketIO.on('city',function(msg){
        $rootScope.ALLcity = msg ;
        $rootScope.ALLcity.push({name:'Другой',id:0});
    });

    // только зона Администратора
    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, options){

            if ((toState.name == 'main.admin') && ($rootScope.user.type != 'admin'))
            {

                event.preventDefault();
                $rootScope.curentUserState = fromState.name;
                sweetAlert.swal("Error", "У вас нет доступа к этому разделу" ,"error");
            }
            else
                $rootScope.curentUserState = toState.name;
        });

    $rootScope.UrlConfig = UrlConfig;

    $scope.controllerBody = function()
    {
        $scope.logout = function()
        {
            $cookies.remove('token');
            $state.go('auth');
        };



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
                        user_service.selectAccessById(response.data.user.id)
                            .then(function(user_access_responce){
                                if (user_access_responce.data.error)
                                {
                                    
                                }
                                else {
                                    $rootScope.user.permission = user_access_responce.data.access;
                                    $rootScope.user.directions = user_access_responce.data.directions;
                                    $rootScope.user.exhibitions = user_access_responce.data.exhibitions;
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


