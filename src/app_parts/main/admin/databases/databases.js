var admin_databasesCtrl = function($scope,$state,direction_category_service,database_category_service,database_service) {
    
    
    Promise.all(
        [
            direction_category_service.selectAll(),
            database_category_service.selectAll(),
            database_service.selectAll()
        ])
        .then(function(arr){
           // console.log(arr[0]);
           // console.log(arr[1]);
           // console.log(arr[2]);
            //R.find(R.propEq('a', 2))(xs); //=> {a: 2}

            var m1 = [
                {id:1,name:"name1"},
                {id:2,name:"name2"},
                {id:3,name:"name3"}
            ];

            var m2 = [
                {id:1,m_id:1,name:"subname1"},
                {id:2,m_id:1,name:"subname2"},
                {id:3,m_id:2,name:"subname3"},
                {id:4,m_id:2,name:"subname4"},
                {id:5,m_id:3,name:"subname5"}
            ];

            var m3 = [
                {id:1,m_id:1,name:"subsubname2"},
                {id:2,m_id:1,name:"subsubname2"},
                {id:3,m_id:2,name:"subsubname3"},
                {id:4,m_id:2,name:"subsubname4"},
                {id:5,m_id:3,name:"subsubname5"},
                {id:6,m_id:4,name:"subsubname6"},
                {id:7,m_id:4,name:"subsubname7"},
                {id:8,m_id:4,name:"subsubname8"},
                {id:9,m_id:4,name:"subsubname9"},
                {id:10,m_id:5,name:"subsubname10"}
            ]

            var sJoin = (parentArr,subArr,parentArrConnectField,subArrConnectField,parentListField) =>
                R.map((parentItem) => R.assoc(parentListField,R.filter((subItem) => subItem[subArrConnectField]==parentItem[parentArrConnectField],subArr),parentItem),parentArr);

            var t1 = sJoin(m2,m3,'id','m_id','subsub');
            var t2 = sJoin(m1,t1,'id','m_id','list');
            console.log(t2);
            
            
            
        })
        .catch(function(err){
            console.log(err);
        });
    
    
    
    
    
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