
var addAccess_typeCtrl = function($scope,tables,table_service)
{

    $scope.add = function()
    {
        table_service.query(tables.access_types).add($scope.access_type)
            .then(function (newRecorcd){
                if (newRecorcd.error)
                {
                    alert(newRecorcd.message)
                }
                else
                {
                    $scope.access_types_list.push(newRecorcd.data);
                    $scope.closeThisDialog();
                }
            })
            .catch(function(error){
                alert(error.message)
            });
    }
};

var editAccess_typeCtrl = function($scope,tables,table_service)
{
    $scope.save = function(access_type)
    {
        table_service.query(tables.access_types).update(access_type)
            .then(function (updatedRecorcd){
                if (updatedRecorcd.error)
                {
                    alert(updatedRecorcd.message)
                }
                else
                {
                    // найти в списке и перезаписать
                    for (var i =0;i<$scope.access_types_list.length;i++)
                    {
                        if ($scope.access_types_list[i].id == access_type.id)
                        {
                            $scope.access_types_list[i] = access_type;
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



var admin_access_typeCtrl = function($scope,$state,tables,table_service,ngDialog,sweetAlert) {

    table_service.query(tables.access_types).selectAll()
        .then(function(list){
            if (list.error)
            {
                alert(list.message)
            }
            else
            {
                $scope.access_types_list = list.data;
            }
        })
        .catch(function(error){
            alert(error.message)
        });

    $scope.addAccess_type = function()
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/access_type/dialog/add.html',
            controller: 'addAccess_typeCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            closeByDocument:false,
            overlay: true
        });
    };
    $scope.editAccess_type = function(access_type)
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/access_type/dialog/edit.html',
            controller: 'editAccess_typeCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            data : angular.copy(access_type),
            closeByDocument:false,
            overlay: true
        });
    };
    $scope.deleteAccess_type = function(access_type)
    {

        sweetAlert.swal({
            title: 'Вы уверены?',
            text: "Востановить будет невозможно",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Да удалить!',
            cancelButtonText: 'Нет'
        }).then(function() {

            table_service.query(tables.access_types).remove(access_type.id)
                    .then(function () {
                        $scope.access_types_list.splice(R.findIndex(R.propEq('id', access_type.id))($scope.access_types_list),1);
                        sweetAlert.swal(
                            {
                                title: 'Успешно',
                                text: "Категория(дирекция) удалена",
                                type: 'success',
                                timer:2000
                            }
                        ).done();
                    })
                    .catch(function(error){
                        alert(error.message)
                    });

            }).done();
       
    };  
    
    
    
    
    
};

kmkya_client.controller('admin_access_typeCtrl',admin_access_typeCtrl);
kmkya_client.controller('addAccess_typeCtrl',addAccess_typeCtrl);
kmkya_client.controller('editAccess_typeCtrl',editAccess_typeCtrl);