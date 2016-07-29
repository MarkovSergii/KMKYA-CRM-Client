/**
 * Created by user on 28.07.2016.
 */

var mainCtrl = function($scope,$state,toastr,sweetAlert,ngDialog,Upload){

    toastr.success('Hello world!', 'Toastr fun!');
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

    $scope.go_auth = function()
    {
        $state.go('auth');
    }
};


var SomeController = function($scope){
    $scope.hhgg = 'super';
};

kmkya_client.controller('mainCtrl',mainCtrl);
kmkya_client.controller('SomeController',SomeController);


