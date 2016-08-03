
var admin_direction_categoryCtrl = function($scope,$state,direction_category_service) {

    

    direction_category_service.selectAll()
        .then(function(response){
            console.log(response);
            if (response.status == 200)
            {
                $scope.direction_category_list =response.data;
            }
            else
            {
                alert(response.statusText);
            }
        })
        .catch(function(error){
            alert(error.statusText);
        });
    
};

kmkya_client.controller('admin_direction_categoryCtrl',admin_direction_categoryCtrl);