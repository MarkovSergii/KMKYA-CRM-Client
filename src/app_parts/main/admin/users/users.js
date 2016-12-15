'use strict';

// код который громоздкий и повтаряется несколько раз лутьше вынести в константы
let VALIDATIONS ={
    EMAIL: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
    PASSWORD:/^[а-яА-ЯёЁa-zA-Z0-9]{6,}$/i
};


var addUserCtrl = function ($scope, user_service) {
    let check = function()
    {
//        this.clearfields();

        if ($('#input_name').val().length==0)
        {
            $('#name_span').show();
            return false
        }

        if ($('#input_email').val().match(VALIDATIONS.EMAIL) == null)
        {
            $('#email_span').show();
            return false
        }

        if ($('#input_password').val().match(VALIDATIONS.PASSWORD)== null)
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
                "name": $scope.newuser.name,
                "email": $scope.newuser.email,
                "password": $scope.newuser.password,
                "type": $scope.newuser.type,
                "access_types": [1],
                "directions": [1]
            };

        user_service.add(data)
            .then(function (newRecord){
                if (newRecord.error)
                {
                    alert(newRecord.message)
                }
                else
                {
                    $scope.users_list[$scope.users_list.length] = newRecord.data;
                    $scope.closeThisDialog();
                }
            })
            .catch(function(error){
                alert(error.message)
            });
        }
    }


};

var editUserCtrl = function($scope,user_service,kmkya_utils)
{
    $scope.saveUser = function(ngDialogData)
    {

        let data = {
            "id": $scope.ngDialogData.id,
            "name": $scope.ngDialogData.name,
            "email": $scope.ngDialogData.email,
            "type": $scope.ngDialogData.type,
            "access_types": [1],
            "directions": [1]
        };

        console.log($scope.ngDialogData);

        user_service.update(data)
            .then(function (updatedRecord){
                if (updatedRecord.error)
                {
                    alert(updatedRecord.message)
                }
                else
                {
                    // лутьше писать используя готовые функции чем сомому делать for-if
                    let userIndex = kmkya_utils.findIndexByField($scope.users_list,'id',data.id);
                    $scope.users_list[userIndex] = data;
                    $scope.users_list[userIndex].createdAt = $scope.ngDialogData.createdAt;
                    $scope.closeThisDialog();

                    // найти в списке и перезаписать
                    /*for (var i=0; i<$scope.users_list.length; i++)
                    {
                        if ($scope.users_list[i].id == data.id)
                        {
                            $scope.users_list[i] = data;
                            $scope.users_list[i].createdAt = $scope.ngDialogData.createdAt;
                            $scope.closeThisDialog();
                            break;
                        }
                    }*/

                }
            })
            .catch(function(error){
                alert(error.message)
            });
    };

};

var admin_usersCtrl = function($scope,user_service, ngDialog, $state,kmkya_utils) {
    $scope.users_list = {};
    $scope.hidePass = false;
    $scope.typeUser = {};

    unique = function(arr) {
        let str = [];
        nextInput:

            // эта строчка делает то же что и весь код ниже    
            $scope.typeUser = kmkya_utils.uniq(arr.map(item=>item.type));
          /*  for (var i = 0; i < arr.length; i++) {
                str[i] = arr[i].type; // для каждого элемента
            }

            str = kmkya_utils.uniq(str);

            for (var i = 0; i < str.length; i++) {
                $scope.typeUser[i] = str[i]; // для каждого элемента
            }*/
        console.log($scope.typeUser);

    };

    let check = function()
    {
        //       this.clearfields();

        if ($('#input_name').val().length==0)
        {
            $('#name_span').show();
            return false
        }

        if ($('#input_email').val().match(VALIDATIONS.EMAIL) == null)
        {
            $('#email_span').show();
            return false
        }

        if ($('#input_password').val().match(VALIDATIONS.PASSWORD)== null)
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
    
    user_service.selectAll()
        .then(function (list) {
            if (list.error)
            {
                alert(list.message);
            } else {
                console.log(list.data);
                $scope.users_list = list.data;
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
            data: angular.copy(user),
            closeByDocument:false,
            overlay: true
        });
    };
};

kmkya_client.controller('admin_usersCtrl',admin_usersCtrl);
kmkya_client.controller('addUserCtrl', addUserCtrl);
kmkya_client.controller('editUserCtrl', editUserCtrl);