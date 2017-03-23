var admin_countryCtrl = function($scope,$state,tables,table_service) {

    table_service.query(tables.country).selectAll()
        .then(function(list){
            if (list.error)
            {
                alert(list.message)
            }
            else
            {
                $scope.country_list = list.data;
            }
        })
        .catch(function(error){
            alert(error.message)
        });

};

kmkya_client.controller('admin_countryCtrl',admin_countryCtrl);