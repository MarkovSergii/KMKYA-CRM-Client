
var admin_direction_categoryCtrl = function($scope,$state,direction_category_service) {


        
    // get all direction_category
    direction_category_service.selectAll()
        .then(function(list){
            if (list.error)
            {
                alert(list.message)
            }
            else
            {
                $scope.direction_category_list = list.data;
                console.log($scope.direction_category_list );
            }
        })
        .catch(function(error){
            alert(error.message)
        });



    
    
};

kmkya_client.controller('admin_direction_categoryCtrl',admin_direction_categoryCtrl);