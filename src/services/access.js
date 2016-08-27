/**
 * Created by user on 27.08.2016.
 */
kmkya_client.service('access', function ($http,UrlConfig,$q) {

 
    this.getAccessForUserById = function(id)
    {
        return $q(function(resolve, reject) {

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/access/byUserId/'+id)
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

    this.delete = function(id)
    {
        
    };

    this.insert = function(access)
    {

    };

    return this;
});
