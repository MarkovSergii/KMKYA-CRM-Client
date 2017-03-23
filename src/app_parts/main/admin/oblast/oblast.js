var admin_oblastCtrl = function($scope,$state,tables,table_service) {
    
    table_service.query(tables.oblast).selectAll()
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