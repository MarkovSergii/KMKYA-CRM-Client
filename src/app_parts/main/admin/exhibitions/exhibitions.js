/**
 * Created by user on 03.08.2016.
 */
var admin_exhibitionsCtrl = function($scope,exhibitions_service, $state) {
    $scope.exhibitions = {};

    // get all direction_category
    exhibitions_service.selectAll()
        .then(function(list){
            if (list.error)
            {
                alert(list.message)
            }
            else
            {
                $scope.exhibitions_list = list.data;
                console.log($scope.exhibitions_list);
            }
        })
        .catch(function(error){
            alert(error.message)
        });
    //
    // $scope.addDirection_category = function()
    // {
    //     $scope.addDialog = ngDialog.openConfirm({
    //         template: 'app_parts/main/admin/direction_category/dialog/add.html',
    //         controller: 'addDirectionCategoryCtrl',
    //         className: 'ngdialog-theme-default custom-width-600',
    //         showClose: false,
    //         scope:$scope,
    //         closeByDocument:false,
    //         overlay: true
    //     });
    // };
    // $scope.editDirection_category = function(direction_category)
    // {
    //     $scope.addDialog = ngDialog.openConfirm({
    //         template: 'app_parts/main/admin/direction_category/dialog/edit.html',
    //         controller: 'editDirectionCategoryCtrl',
    //         className: 'ngdialog-theme-default custom-width-600',
    //         showClose: false,
    //         scope:$scope,
    //         data : angular.copy(direction_category),
    //         closeByDocument:false,
    //         overlay: true
    //     });
    // };
    // $scope.deleteDirection_category = function(direction_category)
    // {
    //
    //     sweetAlert.swal({
    //         title: 'Вы уверены?',
    //         text: "Востановить будет невозможно",
    //         type: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Да удалить!',
    //         cancelButtonText: 'Нет'
    //     }).then(function() {
    //
    //         sweetAlert.swal({
    //             title: 'Куда привязать элементы удаляемой дирекции' ,
    //             input: 'select',
    //             inputOptions: _.object(_.map(_.without($scope.direction_category_list,direction_category), _.values)),
    //             inputPlaceholder: 'Вибирите дирекцию',
    //             showCancelButton: true,
    //             cancelButtonText: 'Отмена',
    //             inputValidator: function(value) {
    //                 return new Promise(function(resolve, reject) {
    //                     if (value != '') {
    //                         resolve();
    //                     } else {
    //                         reject('Ви должны выбрать дирекцию');
    //                     }
    //                 });
    //             }
    //         }).then(function(result) {

                // TODO: delete category and link all it exhibition to result



    //             direction_category_service.delete(direction_category.id,result)
    //                 .then(function () {
    //                     $scope.direction_category_list.splice(R.findIndex(R.propEq('id', direction_category.id))($scope.direction_category_list),1);
    //                     sweetAlert.swal(
    //                         {
    //                             title: 'Успешно',
    //                             text: "Категория(дирекция) удалена",
    //                             type: 'success',
    //                             timer:2000
    //                         }
    //                     ).done();
    //                 })
    //                 .catch(function(error){
    //                     alert(error.message)
    //                 });
    //
    //         }).done();
    //     }).done();
    // };
};

kmkya_client.controller('admin_exhibitionsCtrl',admin_exhibitionsCtrl);