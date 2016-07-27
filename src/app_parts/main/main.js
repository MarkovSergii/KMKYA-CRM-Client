/**
 * Created by user on 26.07.2016.
 */
kmkya_client.controller('mainCtrl',function($scope,$state){
    $scope.hh = 'DDD';

    $scope.go_auth = function()
    {
        $state.go('auth');
    }
});