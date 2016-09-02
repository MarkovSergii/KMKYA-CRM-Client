var admin_databasesCtrl = function($scope,$state) {
    $scope.list = [
        {
            direction_id:1,
            direction_name :"Fashion",
            razdels:[
                {
                    rasdel_id:1,
                    razdel_name:"Раздел 1",
                    databases:[
                        {
                            db_id:1,
                            db_name:"БД1"
                        },
                        {
                            db_id:2,
                            db_name:"БД2"
                        }
                    ]
                },
                {
                    rasdel_id:2,
                    razdel_name:"Раздел 2",
                    databases:[
                        {
                            db_id:3,
                            db_name:"БД3"
                        },
                        {
                            db_id:4,
                            db_name:"БД4"
                        },
                        {
                            db_id:5,
                            db_name:"БД5"
                        }
                    ]
                }
            ]
        },
        {
            direction_id:2,
            direction_name :"Mebel",
            razdels:[
                {
                    rasdel_id:3,
                    razdel_name:"Раздел 1",
                    databases:[
                        {
                            db_id:4,
                            db_name:"БД4"
                        },
                        {
                            db_id:5,
                            db_name:"БД5"
                        }
                    ]
                },
                {
                    rasdel_id:4,
                    razdel_name:"Раздел 2",
                    databases:[
                        {
                            db_id:6,
                            db_name:"БД6"
                        }
                    ]
                }
            ]
        }
    ];
};

kmkya_client.controller('admin_databasesCtrl',admin_databasesCtrl);