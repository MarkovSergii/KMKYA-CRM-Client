/**
 * Created by sergii on 30.10.16.
 */
'use strict';


var addFirmsCtrl = function($scope,firms_service,tags)
{
    $scope.firm={};
    $scope.getClass1 = ()=>{
        return ($scope.firm.country!=1)  ? "col-md-5" : "col-md-7"
    }
    $scope.getClass2 = ()=>{
        return ($scope.firm.country!=1)  ? "col-md-3" : "col-md-4"
    }
    $scope.getClass3 = ()=>{
        return ($scope.firm.country!=1)  ? "col-md-9" : "col-md-8"
    }
    $scope.tags = [
        { text: 'Пример' },
        { text: 'предустановленых' },
        { text: 'Тегов' }
    ];

    $scope.ALLtags = tags.data.map((one_tag)=>{
        one_tag.text = one_tag.name;
        return one_tag;
    }) || [];
    $scope.loadTags = function(q){
        return $scope.ALLtags.filter(function(tag) {
            return (tag.text.toLowerCase()).includes(q.toLowerCase())
        });
    };


    $scope.firmValid = function ()
    {
        return false;
    };

    $scope.cityFilter = function(one_city){
        return ((one_city.oblast_id == $scope.firm.oblast) || (one_city.id==0))
    };
/*
    $scope.addFirm = function()
    {
        firms_service.add($scope.firm)
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
    }*/
};

var editFirmCtrl = function($scope,firms_service)
{/*
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
    }*/
};


var firmsCtrl = function($scope,$state,$rootScope,uiGridConstants,firms_service,ngDialog) {
    $scope.gridOptions = {
        enableFiltering: true,
        enableColumnMenus: true,
        onRegisterApi: function(gridApi){
            $scope.gridApi = gridApi;
        },
        columnDefs: [
            // default
            { field: 'name'},
            { field: 'country'},
            { field: 'oblast' },
            { field: 'city' },
            { field: 'address' },
            { field: 'tags' }
        ]
    };



    firms_service.selectByDirectionId($state.params.direction_id)
        .then((data)=>{
            console.log(data.data);
            $scope.gridOptions.data = [];//$scope.myData;
        })
        .catch(console.log)

    $scope.addFirmDialog = function(){
        ngDialog.openConfirm({
            template: 'app_parts/main/database/firms/dialog/add.html',
            controller: 'addFirmsCtrl',
            className: 'ngdialog-theme-default custom-width-1000',
            showClose: false,
            scope:$scope,
            closeByDocument:false,
            overlay: true,
            resolve:{
                tags : ()=>firms_service.selectAllTags($state.params.direction_id)
            }

        });
    };

    $scope.editFirmDialog = function(){
        ngDialog.openConfirm({
            template: 'app_parts/main/database/firms/dialog/edit.html',
            controller: 'editFirmsCtrl',
            className: 'ngdialog-theme-default custom-width-1000',
            showClose: false,
            scope:$scope,
            closeByDocument:false,
            overlay: true
        });
    }
    
};


kmkya_client.controller('addFirmsCtrl',addFirmsCtrl);
kmkya_client.controller('editFirmCtrl',editFirmCtrl);
kmkya_client.controller('firmsCtrl',firmsCtrl);
