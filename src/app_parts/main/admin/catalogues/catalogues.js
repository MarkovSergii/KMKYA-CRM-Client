var addCataloguesCtrl = function($scope,catalogues_service)
{
   $scope.addCatalogue = function()
    {

        catalogues_service.add($scope.catalogue)
            .then(function (newRecorcd){
                if (newRecorcd.error)
                {
                    alert(newRecorcd.message)
                }
                else
                {
                    $scope.catalogues_list.push(newRecorcd.data);
                    $scope.closeThisDialog();
                }
            })
            .catch(function(error){
                alert(error.message)
            });
    }
};


var editCataloguesContentCtrl = function($scope, catalogues_service)
{
    // TODO insert add/edit questions it types and ansvers
};

var editCataloguesCtrl = function($scope, catalogues_service)
{
    $scope.saveCatalogue = function(catalogue)
    {
        catalogues_service.update(catalogue)
            .then(function (updatedRecorcd){
                console.log(updatedRecorcd);
                if (updatedRecorcd.error)
                {
                    alert(updatedRecorcd.message)
                }
                else
                {
                    // найти в списке и перезаписать
                    for (var i =0;i<$scope.catalogues_list.length;i++)
                    {
                        if ($scope.catalogues_list[i].id == updatedRecorcd.data.id)
                        {
                            $scope.catalogues_list[i] = updatedRecorcd.data;
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

var adminCataloguesCtrl = function($scope, ngDialog,catalogues_service)
{

    $scope.openAddCatalogueWindow = function()
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/catalogues/dialog/add.html',
            controller: 'addCataloguesCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            closeByDocument:false,
            overlay: true
        });
    };



    $scope.editCatalogueContent = function(catalogue)
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/catalogues/dialog/editContent.html',
            controller: 'editCataloguesContentCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            data: angular.copy(catalogue),
            closeByDocument:false,
            overlay: true
        });
    };
    
     $scope.editCatalogue = function(catalogue)
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/catalogues/dialog/edit.html',
            controller: 'editCataloguesCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            data: angular.copy(catalogue),
            closeByDocument:false,
            overlay: true
        });
    };

    catalogues_service.selectAll()
        .then(function(list){
            if (list.error)
            {
                alert(list.message)
            }
            else
            {
                $scope.catalogues_list = list.data;
            }
        })
        .catch(function(error){
            alert(error.message)
        });


};

kmkya_client.controller('adminCataloguesCtrl',adminCataloguesCtrl);
kmkya_client.controller('addCataloguesCtrl',addCataloguesCtrl);
kmkya_client.controller('editCataloguesCtrl',editCataloguesCtrl);
kmkya_client.controller('editCataloguesContentCtrl',editCataloguesContentCtrl);