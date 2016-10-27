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

var admin_usersCtrl = function($scope,user_service, ngDialog, $state) {
    $scope.users_list = {};
    
    user_service.selectAll()
        .then(function (list) {
            if (list.error)
            {
                alert(list.message);
            } else {
                $scope.users_list = list.data;
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
};

kmkya_client.controller('admin_usersCtrl',admin_usersCtrl);
kmkya_client.controller('addUserCtrl', addUserCtrl);