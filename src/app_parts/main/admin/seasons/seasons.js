/**
 * Created by user on 03.08.2016.
 */

var addSeasonCtrl = function($scope,table_service,tables)
{

    $scope.add = function()
    {
        table_service.query(tables.seasons).add($scope.season)
            .then(function (newRecorcd){
                if (newRecorcd.error)
                {
                    alert(newRecorcd.message)
                }
                else
                {
                    $scope.seasons_list.push(newRecorcd.data);
                    $scope.closeThisDialog();
                }
            })
            .catch(function(error){
                alert(error.message)
            });
    }
};

var editSeasonCtrl = function($scope,table_service,tables)
{
    $scope.save = function(season)
    {
        table_service.query(tables.seasons).update(season)
            .then(function (updatedRecorcd){
                if (updatedRecorcd.error)
                {
                    alert(updatedRecorcd.message)
                }
                else
                {
                    // найти в списке и перезаписать
                    for (var i =0;i<$scope.seasons_list.length;i++)
                    {
                        if ($scope.seasons_list[i].id == season.id)
                        {
                            $scope.seasons_list[i] = season;
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


var admin_seasonsCtrl = function($scope,$state,table_service,tables,ngDialog,sweetAlert) {

    table_service.query(tables.seasons).selectAll()
        .then(function(list){
            if (list.error)
            {
                alert(list.message)
            }
            else
            {
                $scope.seasons_list = list.data;
            }
        })
        .catch(function(error){
            alert(error.message)
        });

    $scope.addSeason = function()
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/seasons/dialog/add.html',
            controller: 'addSeasonCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            closeByDocument:false,
            overlay: true
        });
    };
    $scope.editSeason = function(season)
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/seasons/dialog/edit.html',
            controller: 'editSeasonCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            data : angular.copy(season),
            closeByDocument:false,
            overlay: true
        });
    };

};

kmkya_client.controller('admin_seasonsCtrl',admin_seasonsCtrl);
kmkya_client.controller('editSeasonCtrl',editSeasonCtrl);
kmkya_client.controller('addSeasonCtrl',addSeasonCtrl);