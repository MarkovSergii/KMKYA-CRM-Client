/**
 * Created by sergii on 30.10.16.
 */
'use strict';

var addFirmsCtrl = function($scope,firms_service,tags,kmkya_utils,$state,$rootScope)
{
    $scope.firm={};

    $scope.getClass1 = ()=>{
        return ($scope.firm.country!=1)  ? "col-md-5" : "col-md-7"
    };
    $scope.getClass2 = ()=>{
        return ($scope.firm.country!=1)  ? "col-md-3" : "col-md-4"
    };
    $scope.getClass3 = ()=>{
        return ($scope.firm.country!=1)  ? "col-md-9" : "col-md-8"
    };

    $scope.cityFilter = function(one_city){
        return ((one_city.oblast_id == $scope.firm.oblast_id) || (one_city.id==0))
    };


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
        if (!$scope.firm.name) return false;

        if (!$scope.firm.country_id) return false;

        if (($scope.firm.country_id==1) && (!$scope.firm.oblast_id)) return false;

        if (($scope.firm.country_id==1) && ($scope.firm.oblast_id) && (!$scope.firm.city_id)) return false;

        if (($scope.firm.city_id==0) && (!$scope.firm.city)) return false;

        return true

    };

    let prepareFirmData = (data)=>{
        let newFirm = angular.copy(data);
        newFirm.database_id =  $state.params.direction_id;
        newFirm.country = kmkya_utils.findByField($rootScope.ALLcountry,'id',parseInt(newFirm.country_id)).name;
        if (newFirm.country_id==1) newFirm.oblast = kmkya_utils.findByField($rootScope.ALLoblast,'id',parseInt(newFirm.oblast_id)).name;
        if ((newFirm.country_id==1) && (newFirm.city_id!=0)) newFirm.city = kmkya_utils.findByField($rootScope.ALLcity,'id',parseInt(newFirm.city_id)).name;
        if (newFirm.tags){
            newFirm.tagsNames = newFirm.tags.map((tag)=>tag.text).join(',').toLowerCase()
            newFirm.tags = JSON.stringify(newFirm.tags);
        }
        
        return newFirm;
    };


    $scope.addFirm = function()
    {



        firms_service.add(prepareFirmData($scope.firm))
            .then(function (newRecorcd){
                if (newRecorcd.error)
                {
                    alert(newRecorcd.message)
                }
                else
                {
                    $scope.firmsList.push(newRecorcd.data);
                    $scope.closeThisDialog();
                }
            })
            .catch(function(error){
                alert(error.message)
            });
    }
};

var editFirmCtrl = function($scope,firms_service,firmToEdit,tags)
{


    $scope.firm = firmToEdit.data;

    $scope.firm.tags = ($scope.firm.tags) ?  JSON.parse($scope.firm.tags) : []

    $scope.getClass1 = ()=>{
        return ($scope.firm.country!=1)  ? "col-md-5" : "col-md-7"
    };
    $scope.getClass2 = ()=>{
        return ($scope.firm.country!=1)  ? "col-md-3" : "col-md-4"
    };
    $scope.getClass3 = ()=>{
        return ($scope.firm.country!=1)  ? "col-md-9" : "col-md-8"
    };

    $scope.cityFilter = function(one_city){
        return ((one_city.oblast_id == $scope.firm.oblast_id) || (one_city.id==0))
    };

    $scope.ALLtags = tags.data.map((one_tag)=>{
          one_tag.text = one_tag.name;
          return one_tag;
      }) || [];

    $scope.loadTags = function(q){
        return $scope.ALLtags.filter(function(tag) {
            return (tag.text.toLowerCase()).includes(q.toLowerCase())
        });
    };

};


var firmsCtrl = function($scope,$state,$rootScope,uiGridConstants,firms_service,ngDialog) {


    $scope.firmsList = [];

    $scope.gridOptions = {
        enableFiltering: true,
        enableColumnMenus: true,
        enableRowSelection: true,
        multiSelect : false,
        noUnselect : true,
        enableSelectAll: false,
        enableRowHeaderSelection: false,
        showFooter: true,
        onRegisterApi: function(gridApi){
            $scope.gridApi = gridApi;
        },
        appScopeProvider: {
            onDblClick : function(row) {
                console.log(row.entity.id)
                $scope.editFirmDialog(row.entity.id);

            }
        },
        rowTemplate: "<div ng-dblclick=\"grid.appScope.onDblClick(row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell ></div>",
        columnDefs: [
            // default
            {name:"name", field: 'name'},
            {name:"country", field: 'country'},
            {name:"oblast", field: 'oblast' },
            {name:"city", field: 'city' },
            {name:"address", field: 'address' },
            {name:"tags", field: 'tagsNames' }
        ]
    };


    firms_service.selectByDirectionId($state.params.direction_id)
        .then((data)=>{
            $scope.firmsList = data.data;
            $scope.gridOptions.data = $scope.firmsList;
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

    $scope.editFirmDialog = function(firmId){
        ngDialog.openConfirm({
            template: 'app_parts/main/database/firms/dialog/edit.html',
            controller: 'editFirmCtrl',
            className: 'ngdialog-theme-default custom-width-1100',
            showClose: false,
            scope:$scope,
            closeByDocument:false,
            overlay: true,
            resolve:{
                tags : ()=>firms_service.selectAllTags($state.params.direction_id),
                firmToEdit: ()=>firms_service.selectById(firmId)
            }
        });
    }
    
};


kmkya_client.controller('addFirmsCtrl',addFirmsCtrl);
kmkya_client.controller('editFirmCtrl',editFirmCtrl);
kmkya_client.controller('firmsCtrl',firmsCtrl);
