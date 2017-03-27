/**
 * Created by Марина on 27.03.2017.
 */


var addPlaceCtrl = function($scope,table_service,tables)
{

    $scope.add = function()
    {
        table_service.query(tables.places).add($scope.place)
            .then(function (newRecorcd){
                if (newRecorcd.error)
                {
                    alert(newRecorcd.message)
                }
                else
                {
                    $scope.places_list.push(newRecorcd.data);
                    $scope.closeThisDialog();
                }
            })
            .catch(function(error){
                alert(error.message)
            });
    }
};

var editPlaceCtrl = function($scope,table_service,tables)
{
    $scope.save = function(place)
    {
        table_service.query(tables.places).update(place)
            .then(function (updatedRecorcd){
                if (updatedRecorcd.error)
                {
                    alert(updatedRecorcd.message)
                }
                else
                {
                    // найти в списке и перезаписать
                    for (var i =0;i<$scope.places_list.length;i++)
                    {
                        if ($scope.places_list[i].id == place.id)
                        {
                            $scope.places_list[i] = place;
                            $scope.closeThisDialog();
                            break;
                        }
                    }
                }
            })
            .catch(function(error){
                alert(error.message)
            });
    }
};


var adminPlacesCtrl = function($scope,$state,table_service,tables,ngDialog,sweetAlert) {

    table_service.query(tables.places).selectAll()
        .then(function(list){
            if (list.error)
            {
                alert(list.message)
            }
            else
            {
                $scope.places_list = list.data;
            }
        })
        .catch(function(error){
            alert(error.message)
        });

    $scope.addPlace = function()
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/places/dialog/add.html',
            controller: 'addPlaceCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            closeByDocument:false,
            overlay: true
        });
    };
    $scope.editPlace = function(place)
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/places/dialog/edit.html',
            controller: 'editPlaceCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            data : angular.copy(place),
            closeByDocument:false,
            overlay: true
        });
    };

};

kmkya_client.controller('adminPlacesCtrl',adminPlacesCtrl);
kmkya_client.controller('editPlaceCtrl',editPlaceCtrl);
kmkya_client.controller('addPlaceCtrl',addPlaceCtrl);