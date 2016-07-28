/**
 * Created by user on 28.07.2016.
 */
/**
 * Created by user on 26.07.2016.
 */
kmkya_client.controller('mainCtrl',function($scope,$state,toastr,sweetAlert){

    toastr.success('Hello world!', 'Toastr fun!');
    sweetAlert.swal("Here's a message");
    $scope.hh = 'main';

    $scope.go_auth = function()
    {
        $state.go('auth');
    }
});