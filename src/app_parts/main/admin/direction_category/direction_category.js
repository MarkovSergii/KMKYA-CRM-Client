
var addDirectionCategoryCtrl = function($scope)
{
    
    $scope.addCategory = function()
    {

        alert('add');
        $scope.closeThisDialog();
    }   
};

var editDirectionCategoryCtrl = function($scope)
{

    $scope.saveCategory = function()
    {

        alert('save');
        $scope.closeThisDialog();
    }
};



var admin_direction_categoryCtrl = function($scope,$state,direction_category_service,ngDialog,sweetAlert,_) {
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

    $scope.addDirection_category = function(new_direction_category)
    {
        $scope.addDialog = ngDialog.open({
            template: '/app_parts/main/admin/direction_category/dialog/add.html',
            controller: 'addDirectionCategoryCtrl',
            overlay: false
        });
    };
    $scope.editDirection_category = function(direction_category)
    {
        $scope.addDialog = ngDialog.open({
            template: '/app_parts/main/admin/direction_category/dialog/edit.html',
            controller: 'editDirectionCategoryCtrl',
            overlay: false
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

                sweetAlert.swal(
                    {
                        title: 'Успешно',
                        text: "Категория(дирекция) удалена"+result,
                        type: 'success',
                        timer:2000
                    }
                ).done();
            }).done();
        }).done();
    };


    
    
};


kmkya_client.controller('admin_direction_categoryCtrl',admin_direction_categoryCtrl);
kmkya_client.controller('addDirectionCategoryCtrl',addDirectionCategoryCtrl);
kmkya_client.controller('editDirectionCategoryCtrl',editDirectionCategoryCtrl);
