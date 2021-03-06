/**
 * Created by user on 26.07.2016.
 */

var authCtrl = function($scope,$state,$cookies,UrlConfig,$http,toastr,$rootScope,user_service){


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

                                $rootScope.token = response.data.token;
                                $rootScope.curentUserState = 'main';
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

