var admin_cityCtrl = function($scope,$state,address_service) {
    address.getCities()
        .then(function(list){
            if (list.error)
            {
                alert(list.message)
            }
            else
            {
                $scope.city_list = list.data;
            }
        })
        .catch(function(error){
            alert(error.message)
        });
};

kmkya_client.controller('admin_cityCtrl',admin_cityCtrl);