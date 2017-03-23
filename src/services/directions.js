/**
 * Created by user on 03.08.2016.
 */

kmkya_client.service('directions_service', function ($http,UrlConfig,$q,Upload) {

    this.add = function(direction_category)
    {
        return $q(function(resolve, reject) {
            Upload.upload({
                url: UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/directions/insert',
                data: {name: direction_category.name, file: direction_category.logo}
            })
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
    
    this.update = function(direction)
    {
        return $q(function(resolve, reject) {

            if (direction.new_logo)
            {
                direction.logo = direction.new_logo;
                Upload.upload({
                    url: UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/directions/'+direction.id+'/update',
                    data: {name: direction.name, file: direction.logo}
                })
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
            }
            else
            {
                $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/directions/'+direction.id+'/update',direction)
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
            }


        });
    };

        return this;
});

