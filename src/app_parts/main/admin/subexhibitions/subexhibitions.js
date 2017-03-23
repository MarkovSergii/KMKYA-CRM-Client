/**
 * Created by Марина on 17.03.2017.
 */

var addSubexhibitionCtrl = function($scope,tables,table_service)
{
   $scope.addSubexhibition = function()
    {

        table_service.query(tables.subexhibitions).add($scope.subexhibition)
            .then(function (newRecorcd){
                if (newRecorcd.error)
                {
                    alert(newRecorcd.message)
                }
                else
                {
                    console.log(newRecorcd.data);
                    $scope.subexhibitions_list.push(newRecorcd.data);
                    $scope.closeThisDialog();
                }
            })
            .catch(function(error){
                alert(error.message)
            });
    }
};

var editSubexhibitionCtrl = function($scope, tables,table_service)
{
    $scope.saveSubexhibition = function(subexhibition)
    {
        table_service.query(tables.subexhibitions).update(subexhibition)
            .then(function (updatedRecorcd){
                console.log(updatedRecorcd);
                if (updatedRecorcd.error)
                {
                    alert(updatedRecorcd.message)
                }
                else
                {
                    // найти в списке и перезаписать
                    for (var i =0;i<$scope.subexhibitions_list.length;i++)
                    {
                        if ($scope.subexhibitions_list[i].id == updatedRecorcd.data.id)
                        {
                            $scope.subexhibitions_list[i] = updatedRecorcd.data;
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

var adminSubexhibitionsCtrl = function($scope, ngDialog,tables,table_service)
{

    $scope.openAddSubexhibitionWindow = function()
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/subexhibitions/dialog/add.html',
            controller: 'addSubexhibitionCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            closeByDocument:false,
            overlay: true
        });
    };

     $scope.editSubexhibition = function(subexhibition)
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/subexhibitions/dialog/edit.html',
            controller: 'editSubexhibitionCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            data: angular.copy(subexhibition),
            closeByDocument:false,
            overlay: true
        });
    };

    table_service.query(tables.subexhibitions).selectAll()
        .then(function(list){
            if (list.error)
            {
                alert(list.message)
            }
            else
            {
                $scope.subexhibitions_list = list.data;
                console.log($scope.subexhibitions_list);
            }
        })
        .catch(function(error){
            alert(error.message)
        });


};

kmkya_client.controller('adminSubexhibitionsCtrl',adminSubexhibitionsCtrl);
kmkya_client.controller('addSubexhibitionCtrl',addSubexhibitionCtrl);
kmkya_client.controller('editSubexhibitionCtrl',editSubexhibitionCtrl);