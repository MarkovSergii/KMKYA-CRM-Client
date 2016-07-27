/**
 * Created by user on 26.07.2016.
 */
kmkya_client.controller('authCtrl',function($scope,$state){
    $scope.hh = 'auth';

    $scope.go_main = function()
    {
        $state.go('main');
    }
});