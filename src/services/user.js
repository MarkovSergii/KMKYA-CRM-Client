/**
 * Created by user on 27.08.2016.
 */

kmkya_client.service('user_service', function ($http,UrlConfig,$q) {

    this.selectAll = function()
    {
        return $q(function(resolve, reject) {

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/user/all')
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

    this.selectAccessById = function(id)
    {
        return $q(function(resolve, reject) {

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/user/'+id+'/select')
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

    this.add = function(newuser)
    {
        return $q(function(resolve, reject) {
            $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/user/insert', newuser)
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

    this.update = function(user)
    {
        return $q(function(resolve, reject) {

            $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/user/'+user.id+'/update',user)
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

    this.selectAccessByUserID  = function(user)
    {
        console.log(user);
        return $q(function(resolve, reject) {

            $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/access_types/'+user.id+'/select',user)
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

    return this;
});

