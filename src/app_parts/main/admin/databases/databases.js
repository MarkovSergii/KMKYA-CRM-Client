
var addDatabaseCategoryCtrl = function ($scope,database_category_service,kmkya_utils) {

    $scope.add = ()=>
    {
        $scope.razdel.direction_category_id = $scope.selectedDirection.id;
        database_category_service.add($scope.razdel)
            .then(function (newRecorcd){
                if (newRecorcd.error)
                {
                    alert(newRecorcd.message)
                }
                else
                {
                    var index = kmkya_utils.findIndexByField($scope.list,'id',$scope.selectedDirection.id);
                    $scope.list[index].list.push(newRecorcd.data);
                    $scope.closeThisDialog();
                }
            })
            .catch(function(error){
                alert(error.message)
            });
    }
};

var editDatabaseCategoryCtrl = function ($scope,database_category_service,kmkya_utils) {


    $scope.save = function(databaseCategory)
    {

        database_category_service.update(databaseCategory)
            .then(function (updatedRecorcd){

                if (updatedRecorcd.error)
                {
                    alert(updatedRecorcd.message)
                }
                else
                {
                    var indexDirection = kmkya_utils.findIndexByField($scope.list,'id',$scope.selectedDirection.id);
                    var indexDatabaseCategory = kmkya_utils.findIndexByField($scope.list[indexDirection].list,'id',databaseCategory.id);

                    $scope.list[indexDirection].list[indexDatabaseCategory] = databaseCategory;
                    $scope.closeThisDialog();

                }
            })
            .catch(function(error){
                alert(error.message)
            });
    }
};

var addDBCtrl = function ($scope,database_service,kmkya_utils) {
    $scope.add = ()=>
    {
        $scope.db.database_category_id = $scope.selectedDatabaseCategory.id;
        database_service.add($scope.db)
            .then(function (newRecorcd){
                if (newRecorcd.error)
                {
                    alert(newRecorcd.message)
                }
                else
                {
                    var indexDirection = kmkya_utils.findIndexByField($scope.list,'id',$scope.selectedDirection.id);
                    var indexRazdel = kmkya_utils.findIndexByField($scope.list[indexDirection].list,'id',$scope.selectedDatabaseCategory.id);
                    $scope.list[indexDirection].list[indexRazdel].list.push(newRecorcd.data);
                    $scope.closeThisDialog();
                }
            })
            .catch(function(error){
                alert(error.message)
            });
    }
};

var editDBCtrl = function ($scope,database_service,kmkya_utils) {

    $scope.save = function(database)
    {

        database_service.update(database)
            .then(function (updatedRecorcd){

                if (updatedRecorcd.error)
                {
                    alert(updatedRecorcd.message)
                }
                else
                {
                    var indexDirection = kmkya_utils.findIndexByField($scope.list,'id',$scope.selectedDirection.id);
                    var indexDatabaseCategory = kmkya_utils.findIndexByField($scope.list[indexDirection].list,'id',$scope.selectedDatabaseCategory.id);
                    var indexDatabase = kmkya_utils.findIndexByField($scope.list[indexDirection].list[indexDatabaseCategory].list,'id',database.id);
                    $scope.list[indexDirection].list[indexDatabaseCategory].list[indexDatabase] = database;
                    $scope.closeThisDialog();

                }
            })
            .catch(function(error){
                alert(error.message)
            });
    }
};

var admin_databasesCtrl = function($scope,$state,direction_category_service,database_category_service,database_service,kmkya_utils,ngDialog,sweetAlert) {

    // load all needed data
    Promise.all(
        [
            direction_category_service.selectAll(),
            database_category_service.selectAll(),
            database_service.selectAll()
        ])
        .then(function(arr){

            var t1 = kmkya_utils.sJoin(arr[1].data,arr[2].data,'id','database_category_id','list');
            $scope.list = kmkya_utils.sJoin(arr[0].data,t1,'id','direction_category_id','list');

        })
        .catch(function(err){
            console.log(err);
        });
        
    $scope.addDatabaseCategoryShowDialog = (direction)=>{
        $scope.selectedDirection = direction;
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/databases/dialog/addDatabaseCategory.html',
            controller: 'addDatabaseCategoryCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            closeByDocument:false,
            overlay: true
        });
    };
    $scope.addDBShowDialog = (direction,databaseCategory)=>{
        $scope.selectedDirection = direction;
        $scope.selectedDatabaseCategory = databaseCategory;
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/databases/dialog/addDB.html',
            controller: 'addDBCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            closeByDocument:false,
            overlay: true
        });
    };
    $scope.editDatabaseCategoryShowDialog = (direction,databaseCategory)=>{
        $scope.selectedDirection = direction;
        $scope.selectedDatabaseCategory = databaseCategory;
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/databases/dialog/editDatabaseCategory.html',
            controller: 'editDatabaseCategoryCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            data : angular.copy(databaseCategory),
            closeByDocument:false,
            overlay: true
        });
    };
    $scope.editDBShowDialog = (direction,databaseCategory,db)=>{
        $scope.selectedDirection = direction;
        $scope.selectedDatabaseCategory = databaseCategory;
        $scope.selectedDB = db;
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/databases/dialog/editDB.html',
            controller: 'editDBCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            data : angular.copy(db),
            closeByDocument:false,
            overlay: true
        });
    };
    $scope.deleteDatabaseCategoryShowDialog = ()=>{
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


        }).done();
    };
    $scope.deleteDBShowDialog = ()=>{
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


        }).done();
    }   

};

kmkya_client.controller('admin_databasesCtrl',admin_databasesCtrl);

kmkya_client.controller('addDatabaseCategoryCtrl',addDatabaseCategoryCtrl);
kmkya_client.controller('editDatabaseCategoryCtrl',editDatabaseCategoryCtrl);
kmkya_client.controller('addDBCtrl',addDBCtrl);
kmkya_client.controller('editDBCtrl',editDBCtrl);


