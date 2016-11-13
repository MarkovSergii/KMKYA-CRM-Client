/**
 * Created by sergii on 30.10.16.
 */

var firmsCtrl = function($scope,$state,$rootScope,uiGridConstants) {
    $scope.gridOptions = {
        enableFiltering: true,
        enableColumnMenus: true,
        onRegisterApi: function(gridApi){
            $scope.gridApi = gridApi;
        },
        columnDefs: [
            // default
            { field: 'firstName', headerCellClass: $scope.highlightFilteredHeader },
            // pre-populated search field

            { field: 'lastName', enableFiltering: false, filter: {
                noTerm: true,
                condition: function(searchTerm, cellValue) {
                    return cellValue.match(/a/);
                }
            }},
            // specifies one of the built-in conditions
            // and a placeholder for the input
            {
                field: 'company',
                filter: {
                    condition: uiGridConstants.filter.ENDS_WITH,
                    placeholder: 'ends with'
                }, headerCellClass: $scope.highlightFilteredHeader
            },
            // custom condition function
            { field: 'employed', headerCellClass: $scope.highlightFilteredHeader }



        ]
    };


    $scope.direction_id = $state.params;
    $scope.myData = [
        {
            "firstName": "Cox",
            "lastName": "Carney",
            "company": "Enormo",
            "employed": true
        },
        {
            "firstName": "Lorraine",
            "lastName": "Wise",
            "company": "Comveyer",
            "employed": false
        },
        {
            "firstName": "Nancy",
            "lastName": "Waters",
            "company": "Fuelton",
            "employed": false
        }
    ];
    $scope.gridOptions.data = $scope.myData;
}



kmkya_client.controller('firmsCtrl',firmsCtrl);