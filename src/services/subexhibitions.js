/**
 * Created by user on 30.08.2016.
 */
/**
 * Created by user on 27.08.2016.
 */

kmkya_client.service('subexhibitions_service', function ($http,UrlConfig,$q) {

    this.add = function(subexhibition)
    {
        return $q(function(resolve, reject) {

            console.log('hello');
            $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/subexhibitions/insert',subexhibition)
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

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/subexhibitions/all')
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

    this.update = function(subexhibition)
    {
        return $q(function(resolve, reject) {


            $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/subexhibitions/'+subexhibition.id+'/update',subexhibition)
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

