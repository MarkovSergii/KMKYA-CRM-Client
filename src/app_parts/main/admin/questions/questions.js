var addQuestionCtrl = function($scope,table_service,tables)
{
   $scope.addQuestion = function()
    {

        table_service.query(tables.questions).add($scope.question)
            .then(function (newRecorcd){
                if (newRecorcd.error)
                {
                    alert(newRecorcd.message)
                }
                else
                {
                    $scope.questions_list.push(newRecorcd.data);
                    $scope.closeThisDialog();
                }
            })
            .catch(function(error){
                alert(error.message)
            });
    }
};

var editQuestionCtrl = function($scope, table_service,tables)
{
    $scope.saveQuestion = function(question)
    {
        table_service.query(tables.questions).update(question)
            .then(function (updatedRecorcd){
                console.log(updatedRecorcd);
                if (updatedRecorcd.error)
                {
                    alert(updatedRecorcd.message)
                }
                else
                {
                    // найти в списке и перезаписать
                    for (var i =0;i<$scope.questions_list.length;i++)
                    {
                        if ($scope.questions_list[i].id == updatedRecorcd.data.id)
                        {
                            $scope.questions_list[i] = updatedRecorcd.data;
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

var editQuestionContentCtrl = function($scope, table_service,tables){

};

var adminQuestionCtrl = function($scope, ngDialog,table_service,tables)
{

    $scope.openAddQuestionsWindow = function()
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/questions/dialog/add.html',
            controller: 'addQuestionCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            closeByDocument:false,
            overlay: true
        });
    };
    
     $scope.editQuestion = function(question)
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/questions/dialog/edit.html',
            controller: 'editQuestionCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            data: angular.copy(question),
            closeByDocument:false,
            overlay: true
        });
    };

    $scope.editQuestionContent = function(question)
    {
        $scope.addDialog = ngDialog.openConfirm({
            template: 'app_parts/main/admin/questions/dialog/editContent.html',
            controller: 'editQuestionContentCtrl',
            className: 'ngdialog-theme-default custom-width-600',
            showClose: false,
            scope:$scope,
            data: angular.copy(question),
            closeByDocument:false,
            overlay: true
        });
    };

    table_service.query(tables.questions).selectAll()
        .then(function(list){
            if (list.error)
            {
                alert(list.message)
            }
            else
            {
                $scope.questions_list = list.data;
            }
        })
        .catch(function(error){
            alert(error.message)
        });


};

kmkya_client.controller('adminQuestionCtrl',adminQuestionCtrl);
kmkya_client.controller('addQuestionCtrl',addQuestionCtrl);
kmkya_client.controller('editQuestionCtrl',editQuestionCtrl);
kmkya_client.controller('editQuestionContentCtrl',editQuestionContentCtrl);
