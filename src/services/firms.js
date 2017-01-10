/**
 * Created by user on 14.11.2016.
 */
kmkya_client.service('firms_service', function ($http,UrlConfig,$q,Upload) {

    this.selectByDirectionId = function(id)
    {
        return $q(function(resolve, reject) {

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/firms/'+id+'/byDirectionId')
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
    this.selectAllTags = function(id)
    {
        return $q(function(resolve, reject) {

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/tags/all/'+id)
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

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/firms/'+id+'/select')
                .then(function(response){
                    if (response.status == 200)
                    {
                        return resolve( {error:false,message:"",data:response.data.data[0]} );
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

    this.deleteFile = function(firmId,fileId)
    {
        return $q(function(resolve, reject) {

            $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/firms/'+firmId+'/deleteFile/',{fileId:fileId})
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
    this.uploadFile = function(firmFile)
    {
        return $q(function(resolve, reject) {
            Upload.upload({
                url: UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/firms/addFile',
                data: {firmFile: firmFile}
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
    
    this.update = function(firm)
    {
        return $q(function(resolve, reject) {


            $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/firms/'+firm.id+'/update',firm)
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

    this.add = function(firm)
    {
        return $q(function(resolve, reject) {


            $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/firms/insert',firm)
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
