
var addDirectionCategoryCtrl = function($scope,direction_category_service)
{
    
    $scope.addCategory = function()
    {
        direction_category_service.add($scope.category)
            .then(function (newRecorcd){
                if (newRecorcd.error)
                {
                    alert(newRecorcd.message)
                }
                else
                {
                    $scope.direction_category_list.push(newRecorcd.data);
                    $scope.closeThisDialog();
                }
            })
            .catch(function(error){
            alert(error.message)
            });
    }   
};

var editDirectionCategoryCtrl = function($scope,direction_category_service)
{
    $scope.saveCategory = function(direction_category)
    {
        direction_category_service.update(direction_category)
            .then(function (updatedRecorcd){
                if (updatedRecorcd.error)
                {
                    alert(updatedRecorcd.message)
                }
                else
                {
                    // найти в списке и перезаписать
                    for (var i =0;i<$scope.direction_category_list.length;i++)
                    {
                        if ($scope.direction_category_list[i].id == updatedRecorcd.data.id)
                        {
                            $scope.direction_category_list[i] = updatedRecorcd.data;
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



var admin_direction_categoryCtrl = function($scope,$state,direction_category_service,ngDialog,sweetAlert,_) {

    $scope.direction_category = {};

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
            }
        })
        .catch(function(error){
            alert(error.message)
        });

    $scope.addDirection_category = function()
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: '/app_parts/main/admin/direction_category/dialog/add.html',
            controller: 'addDirectionCategoryCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            closeByDocument:false,
            overlay: true
        });
    };
    $scope.editDirection_category = function(direction_category)
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: '/app_parts/main/admin/direction_category/dialog/edit.html',
            controller: 'editDirectionCategoryCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            data : angular.copy(direction_category),
            closeByDocument:false,
            overlay: true
        });
    };
    $scope.deleteDirection_category = function(direction_category)
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

            sweetAlert.swal({
                title: 'Куда привязать элементы удаляемой дирекции' ,
                input: 'select',
                inputOptions: _.object(_.map(_.without($scope.direction_category_list,direction_category), _.values)),
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



                direction_category_service.delete(direction_category.id,result)
                    .then(function () {
                        $scope.direction_category_list.splice(R.findIndex(R.propEq('id', direction_category.id))($scope.direction_category_list),1);
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


kmkya_client.controller('admin_direction_categoryCtrl',admin_direction_categoryCtrl);
kmkya_client.controller('addDirectionCategoryCtrl',addDirectionCategoryCtrl);
kmkya_client.controller('editDirectionCategoryCtrl',editDirectionCategoryCtrl);
