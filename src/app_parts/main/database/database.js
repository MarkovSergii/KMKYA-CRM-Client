/**
 * Created by user on 31.07.2016.
 */
var databaseCtrl = function($scope,$state,$rootScope,sweetAlert,tables,table_service,kmkya_utils) {



    var directions;
    var exhibitions;
    var new_directions;
    table_service.query(tables.directions).selectAll()

        .then(function(data){
            directions = data.data;
        })
        .then(table_service.query(tables.exhibitions).selectAll)
        .then(function(data){
            exhibitions = data.data;
            new_directions = kmkya_utils.sJoin(directions,exhibitions,'id','directions_id','exhibitions').map(function(dir){
                dir.title = dir.name;
                dir.link = "main.admin.directions";
                dir.icon = "fa-dashboard";
                dir.logo = dir.logo;
                dir.have_subitems = true;
                dir.subitems = [
                    {
                    title:"Потенциальные участники",
                    link:"main.database.firms({direction_id:"+dir.id+"})",
                    icon:"fa-database"
                    },
                    {
                    title:"Участие в ",
                    link:"main.uch",
                    icon:"fa-money"
                    }
                ];


                if ((dir.exhibitions) && (dir.exhibitions.length!=0))
                {
                    dir.subitems[1].have_subitems = true;
                    dir.subitems[1].subitems = [];
                    dir.subitems[1].subitems = dir.exhibitions.map(function(exhibition){

                        exhibition.title = exhibition.name;
                        exhibition.link = "main.database.uch({exhibition_id:"+exhibition.id+"})";
                        exhibition.icon = "fa-database";
                        return exhibition;
                    })

                }

                return dir;
            });
            $rootScope.mainMenu = new_directions;
            //console.log(new_directions);
        })
        .catch(console.log);




    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, options){
            if (($rootScope.user.type != 'admin') && (toState.name.includes('main.database.firms')) )
            {
                if (!R.contains(parseInt(toParams.direction_id),$rootScope.user.directions)){
                    event.preventDefault();
                    $rootScope.curentUserState = fromState.name;
                    sweetAlert.swal("Error", "У вас нет доступа к этому разделу" ,"error");
                }
                else
                {
                    $rootScope.curentUserState = toState.name;
                }
            }
            if (($rootScope.user.type != 'admin') && (toState.name.includes('main.database.uch')) )
            {
                if (!R.contains(parseInt(toParams.direction_id),$rootScope.user.exhibitions)){
                    event.preventDefault();
                    $rootScope.curentUserState = fromState.name;
                    sweetAlert.swal("Error", "У вас нет доступа к этому разделу" ,"error");
                }
                else
                {
                    $rootScope.curentUserState = toState.name;
                }
            }


        });



};

kmkya_client.controller('databaseCtrl',databaseCtrl);