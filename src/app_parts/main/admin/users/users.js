'use strict';

// код который громоздкий и повтаряется несколько раз лутьше вынести в константы
let VALIDATIONS ={
    EMAIL: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
    PASSWORD:/^[а-яА-ЯёЁa-zA-Z0-9]{6,}$/i
};


var addUserCtrl = function ($scope, tables,table_service) {
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

            table_service.query(tables.user).add(data)
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

var editUserCtrl = function($scope,tables,table_service,kmkya_utils,directions_service)
{
    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };

    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            $scope.ngDialogData.directions.splice(idx, 1);
        }
        else {
            $scope.ngDialogData.directions.push(item);
        }
    };

    $scope.saveUser = function(ngDialogData)
    {

        let data = {
            "id": $scope.ngDialogData.id,
            "name": $scope.ngDialogData.name,
            "email": $scope.ngDialogData.email,
            "type": $scope.ngDialogData.type,
            "access_types": [],
            "directions": $scope.ngDialogData.directions
        };


        directions_service.query(tables.user).update(data)
            .then(function (updatedRecord){
                if (updatedRecord.error)
                {
                    alert(updatedRecord.message)
                }
                else
                {
                    let userIndex = kmkya_utils.findIndexByField($scope.users_list,'id',data.id);
                    $scope.users_list[userIndex] = data;
                    $scope.users_list[userIndex].createdAt = $scope.ngDialogData.createdAt;
                    $scope.closeThisDialog();
                }
            })
            .catch(function(error){
                alert(error.message)
            });
    };

};

var admin_usersCtrl = function($scope,tables,table_service, ngDialog, $state,kmkya_utils) {
    $scope.users_list = {};
    $scope.hidePass = false;
    $scope.typeUser = {};
    $scope.direction_list = {};

    unique = function(arr) {

        $scope.typeUser = kmkya_utils.uniq(arr.map(item=>item.type));
    };

    table_service.query(tables.directions).selectAll()
        .then(function(list){
            if (list.error)
            {
                alert(list.message)
            }
            else
            {
                $scope.direction_list = list.data;
                console.log($scope.direction_list);
            }
        })
        .catch(function(error){
            alert(error.message)
        });

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

    table_service.query(tables.user).selectAll()
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