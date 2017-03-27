var addCataloguesCtrl = function($scope,table_service,tables)
{
   $scope.addCatalogue = function()
    {

        table_service.query(tables.catalogues).add($scope.catalogue)
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


var editCataloguesContentCtrl = function($scope, table_service,tables)
{
    // TODO insert add/edit questions it types and ansvers
};

var editCataloguesCtrl = function($scope, table_service,tables)
{
    $scope.saveCatalogue = function(catalogue)
    {
        table_service.query(tables.catalogues).update(catalogue)
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


                }
            })
            .catch(function(error){
                alert(error.message)
            });
    }
};

var adminCataloguesCtrl = function($scope, ngDialog,table_service,tables)
{
    var lastIndex = 3;
    $scope.list = [];

    var updateList = function() {
        $scope.list.push({
            'id': '_1',
            'text': 'one'
        },{
            'id': '_2',
            'text': 'two'
        },{
            'id': '_3',
            'text': 'three'
        },{
            'id': '_4',
            'text': 'four'
        });
    };

    $scope.reset = function() {
        $scope.model = [];
    };

    $scope.add = function() {
        lastIndex++;
        updateList();
    };

    updateList();

    $scope.settings = {


        filterClear:"Очистить",
        filterPlaceholder:"фильтр",
        moveSelectedLabel: 'Переместить выбраное',
        moveAllLabel: 'Переместить все',
        removeSelectedLabel: 'Удалить выбраное',
        removeAllLabel: 'Удалить все',
        moveOnSelect: false,
        preserveSelection: 'false',
        selectedListLabel: 'Вопросы для этого каталога',
        nonSelectedListLabel: 'Список доступных вопросов',
        postfix: '_helperz',
        selectMinHeight: 130,
        filter: true,
        filterNonSelected: '1',
        filterSelected: '4',
        infoAll: 'Показано {0}',
        infoFiltered: '<span class="label label-warning">Показано</span> {0} из {1}!',
        infoEmpty: 'Пустой список',
        filterValues: true
    };

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
            className: 'ngdialog-theme-default custom-width-800',
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

    table_service.query(tables.catalogues).selectAll()
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