var admin_cityCtrl = function($scope,$state,tables,table_service) {
    
    table_service.query(tables.city).selectAll()
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