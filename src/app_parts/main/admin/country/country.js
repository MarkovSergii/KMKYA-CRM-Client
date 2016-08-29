var admin_countryCtrl = function($scope,$state,address) {

    address.getCountries()
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