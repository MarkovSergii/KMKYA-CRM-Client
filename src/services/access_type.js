/**
 * Created by user on 27.08.2016.
 */

kmkya_client.service('access_type', function ($http,UrlConfig,$q) {

    this.selectAll = function()
    {
        return $q(function(resolve, reject) {

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/access_types/all')
                .then(function(response){
                    if (response.status == 200)
                    {
                        return resolve( {error:false,message:"",data:response.data.data} );
                    }
                    else
                    {
                        return reject( {error:true,message:response.statusText} );
                    }
                })
                .catch(function(error){
                    return reject({error:true,message:error.statusText} );
                });


        });


    };

    this.selectById = function(id)
    {
        return $q(function(resolve, reject) {

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/access_types/'+id+'/select')
                .then(function(response){
                    if (response.status == 200)
                    {
                        return resolve( {error:false,message:"",data:response.data.data} );
                    }
                    else
                    {
                        return reject( {error:true,message:response.statusText} );
                    }
                })
                .catch(function(error){
                    return reject({error:true,message:error.statusText} );
                });


        });
         
    };

    this.update = function(access_type)
    {
        return $q(function(resolve, reject) {

           
                $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/access_types/'+access_type.id+'/update',access_type)
                    .then(function(response){
                        if (response.status == 200)
                        {
                            return resolve( {error:false,message:"",data:response.data.data} );
                        }
                        else
                        {
                            return reject( {error:true,message:response.statusText} );
                        }
                    })
                    .catch(function(error){
                        return reject({error:true,message:error.statusText} );
                    });
            


        });
    };

    this.add = function(access_type)
    {
        return $q(function(resolve, reject) {


            $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/access_types/insert',access_type)
                .then(function(response){
                    if (response.status == 200)
                    {
                        return resolve( {error:false,message:"",data:response.data.data} );
                    }
                    else
                    {
                        return reject( {error:true,message:response.statusText} );
                    }
                })
                .catch(function(error){
                    return reject({error:true,message:error.statusText} );
                });

        }); 
    };

    this.delete = function(id,access_type_id)
    {
        return $q(function(resolve, reject) {
            $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/exhibitionCategory/'+id+'/delete',{access_type_id:access_type_id})
                .then(function(response){
                    if (response.status == 200)
                    {
                        return resolve( {error:false});
                    }
                    else
                    {
                        return reject( {error:true,message:response.statusText} );
                    }
                })
                .catch(function(error){
                    return reject({error:true,message:error.statusText} );
                });
        });

    };




    return this;
});

