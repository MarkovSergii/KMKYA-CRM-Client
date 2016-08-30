var admin_oblastCtrl = function($scope,$state,address_service) {
    address_service.getOblast()
        .then(function(list){
            if (list.error)
            {
                alert(list.message)
            }
            else
            {
                $scope.oblast_list = list.data;
            }
        })
        .catch(function(error){
            alert(error.message)
        });
};

kmkya_client.controller('admin_oblastCtrl',admin_oblastCtrl);