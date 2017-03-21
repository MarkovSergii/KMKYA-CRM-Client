
kmkya_client.service('catalogues_service', function ($http,UrlConfig,$q) {

    this.add = function(catalogue)
    {
        return $q(function(resolve, reject) {

            console.log('hello');
            $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/catalogues/insert',catalogue)
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

    this.selectAll = function()
    {
        return $q(function(resolve, reject) {

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/catalogues/all')
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

    this.update = function(catalogue)
    {
        return $q(function(resolve, reject) {


            $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/catalogues/'+catalogue.id+'/update',catalogue)
                .then(function(response){
                    console.log(response);
                    if (response.status == 200)
                    {
                        return resolve( {error:false,message:"",data:response.config.data} );
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

