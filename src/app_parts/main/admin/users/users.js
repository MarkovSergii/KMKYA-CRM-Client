var addUserCtrl = function ($scope, user_service) {
    let check = function()
    {
 //       this.clearfields();

        if ($('#input_name').val().length==0)
        {
            $('#name_span').show();
            return false
        }

        if ($('#input_email').val().match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i) == null)
        {
            $('#email_span').show();
            return false
        }

        if ($('#input_password').val().match(/^[а-яА-ЯёЁa-zA-Z0-9]{6,}$/i)== null)
        {
            $('#password_span').show();
            return false
        }

        if ($('#input_password').val()!=$('#input_re_password').val())
        {
            $('#repassword_span').show();
            return false
        }

        return true
// TODO: проверка на наличие вводимого e-mail в cписке пользователей
    };


    $scope.addNewUser = function()
    {
        if (check()){
            let data = {
                name: $scope.newuser.name,
                email: $scope.newuser.email,
                password: $scope.newuser.password,
                type: 'admin'
            };

        user_service.add(data)
            .then(function (newRecord){
                if (newRecord.error)
                {
                    alert(newRecord.message)
                }
                else
                {
                    $scope.users_list.push(newRecord.data);
                    $scope.closeThisDialog();
                }
            })
            .catch(function(error){
                alert(error.message)
            });
        }
    }


};

var editUserCtrl = function($scope,user_service)
{
    $scope.saveUser = function(user)
    {
        console.log(user);
        user_service.update(user)
            .then(function (updatedRecorcd){
                if (updatedRecorcd.error)
                {
                    alert(updatedRecorcd.message)
                }
                else
                {
                    // найти в списке и перезаписать
                    for (var i=0; i<$scope.users_list.length; i++)
                    {
                        if ($scope.users_list[i].id == updatedRecorcd.data.id)
                        {
                            $scope.users_list[i] = updatedRecorcd.data;
                            $scope.closeThisDialog();
                            break;
                        }
                    }

                }
            })
            .catch(function(error){
                alert(error.message)
            });
    }
};

var admin_usersCtrl = function($scope,user_service, ngDialog, $state) {
    $scope.users_list = {};
    $scope.hidePass = false;
    $scope.typeUser = {};

    unique = function(arr) {
        nextInput:
            for (var i = 0; i < arr.length; i++) {
                var str = arr[i].type; // для каждого элемента
                $scope.typeUser[str] = str;
            }
           console.log($scope.typeUser);
    };

    
    user_service.selectAll()
        .then(function (list) {
            if (list.error)
            {
                alert(list.message);
            } else {
                $scope.users_list = list.data;
                console.log($scope.users_list);
                unique($scope.users_list);

            }
        })
        .catch(function(error){
            alert(error.message)
        });


    $scope.addUser = function()
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/users/dialog/add.html',
            controller: 'addUserCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            closeByDocument:false,
            overlay: true
        });
    };

    $scope.editUser = function(user)
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/users/dialog/edit.html',
            controller: 'editUserCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            data : angular.copy(user),
            closeByDocument:false,
            overlay: true
        });
    };
};

kmkya_client.controller('admin_usersCtrl',admin_usersCtrl);
kmkya_client.controller('addUserCtrl', addUserCtrl);
kmkya_client.controller('editUserCtrl', editUserCtrl);