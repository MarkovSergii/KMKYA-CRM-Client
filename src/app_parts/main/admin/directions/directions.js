
var addDirectionsCtrl = function($scope,directions_service)
{

    $scope.addDirection = function()
    {
        directions_service.add($scope.direction)
            .then(function (newRecorcd){
                if (newRecorcd.error)
                {
                    alert(newRecorcd.message)
                }
                else
                {
                    $scope.directions_list.push(newRecorcd.data);
                    $scope.closeThisDialog();
                }
            })
            .catch(function(error){
                alert(error.message)
            });
    }
};

var editDirectionsCtrl = function($scope,directions_service)
{
    $scope.saveDirection = function(directions)
    {
        directions_service.update(directions)
            .then(function (updatedRecorcd){
                if (updatedRecorcd.error)
                {
                    alert(updatedRecorcd.message)
                }
                else
                {
                    // найти в списке и перезаписать
                    for (var i =0;i<$scope.directions_list.length;i++)
                    {
                        if ($scope.directions_list[i].id == updatedRecorcd.data.id)
                        {
                            $scope.directions_list[i] = updatedRecorcd.data;
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



var admin_directionsCtrl = function($scope,$state,tables,table_service,ngDialog,sweetAlert,_) {

    $scope.directions = {};

    // get all direction_category
    table_service.query(tables.directions).selectAll()
        .then(function(list){
            if (list.error)
            {
                alert(list.message)
            }
            else
            {
                $scope.directions_list = list.data;
            }
        })
        .catch(function(error){
            alert(error.message)
        });

    $scope.addDirection = function()
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/directions/dialog/add.html',
            controller: 'addDirectionsCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            closeByDocument:false,
            overlay: true
        });
    };
    $scope.editDirection = function(direction)
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/directions/dialog/edit.html',
            controller: 'editDirectionsCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            data : angular.copy(direction),
            closeByDocument:false,
            overlay: true
        });
    };
    $scope.deleteDirection = function(direction)
    {
        console.log(direction)
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

            sweetAlert.swal({
                title: 'Куда привязать элементы удаляемой дирекции' ,
                input: 'select',
                inputOptions: _.object(_.map(_.without($scope.directions_list,direction), _.values)),
                inputPlaceholder: 'Вибирите дирекцию',
                showCancelButton: true,
                cancelButtonText: 'Отмена',
                inputValidator: function(value) {
                    return new Promise(function(resolve, reject) {
                        if (value != '') {
                            resolve();
                        } else {
                            reject('Ви должны выбрать дирекцию');
                        }
                    });
                }
            }).then(function(result) {

                // TODO: delete category and link all it exhibition to result



                table_service.query(tables.directions).remove(direction.id,result)
                    .then(function () {
                        $scope.directions_list.splice(R.findIndex(R.propEq('id', direction.id))($scope.directions_list),1);
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
        }).done();
    };


    
    
};


kmkya_client.controller('admin_directionsCtrl',admin_directionsCtrl);
kmkya_client.controller('addDirectionsCtrl',addDirectionsCtrl);
kmkya_client.controller('editDirectionsCtrl',editDirectionsCtrl);
