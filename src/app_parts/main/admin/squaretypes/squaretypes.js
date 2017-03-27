/**
 * Created by Марина on 24.03.2017.
 */

var addSquareTypeCtrl = function($scope,tables,table_service)
{
    $scope.addSquareType = function()
    {
        table_service.query(tables.squaretypes).add($scope.squareType)
            .then(function (newRecorcd){
                if (newRecorcd.error)
                {
                    alert(newRecorcd.message)
                }
                else
                {
                    console.log(newRecorcd.data);
                    $scope.squareTypes.push(newRecorcd.data);
                    $scope.closeThisDialog();
                }
            })
            .catch(function(error){
                alert(error.message)
            });
    }
};

var editSquareTypeCtrl = function($scope, tables,table_service)
{
    $scope.saveSquareType = function(type)
    {
        table_service.query(tables.squaretypes).update(type)
            .then(function (updatedRecorcd){
                console.log(updatedRecorcd);
                if (updatedRecorcd.error)
                {
                    alert(updatedRecorcd.message)
                }
                else
                {
                    // найти в списке и перезаписать
                    for (var i =0;i<$scope.squareTypesList.length;i++)
                    {
                        if ($scope.squareTypesList[i].id == updatedRecorcd.data.id)
                        {
                            $scope.squareTypesList[i] = updatedRecorcd.data;
                            $scope.closeThisDialog();
                            break;
                        }
                    }
                    //$scope.direction_category_list.  push(newRecorcd.data);

                }
            })
            .catch(function(error){
                alert(error.message)
            });
    }
};

var adminSquareTypesCtrl = function($scope, ngDialog,tables,table_service)
{

    $scope.openAddSquareTypeWindow = function()
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/squaretypes/dialog/add.html',
            controller: 'addSquareTypeCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            closeByDocument:false,
            overlay: true
        });
    };

    $scope.editSquareType = function(type)
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/squaretypes/dialog/edit.html',
            controller: 'editSquareTypeCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            data: angular.copy(type),
            closeByDocument:false,
            overlay: true
        });
    };

    table_service.query(tables.squaretypes).selectAll()
        .then(function(list){
            if (list.error)
            {
                alert(list.message)
            }
            else
            {
                $scope.squareTypesList = list.data;
                console.log($scope.squareTypesList);
            }
        })
        .catch(function(error){
            alert(error.message)
        });


};

kmkya_client.controller('adminSquareTypesCtrl',adminSquareTypesCtrl);
kmkya_client.controller('addSquareTypeCtrl',addSquareTypeCtrl);
kmkya_client.controller('editSquareTypeCtrl',editSquareTypeCtrl);