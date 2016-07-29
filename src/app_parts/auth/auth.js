/**
 * Created by user on 26.07.2016.
 */

var authCtrl = function($scope,$state,$cookies){
    $scope.hh = 'auth';

    $scope.go_main = function()
    {
        $state.go('main');
    }
};



kmkya_client.controller('authCtrl',authCtrl);

