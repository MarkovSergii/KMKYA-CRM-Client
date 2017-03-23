/**
 * Created by user on 14.11.2016.
 */
kmkya_client.service('firms_service', function ($http,UrlConfig,$q,Upload) {
    
    
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
    this.uploadFile = function(firmFile, firmId)
    {
        return $q(function(resolve, reject) {
            Upload.upload({
                url: UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/firms/addFile',
                data: {firmFile: firmFile, firmId: firmId}
            })
                .then(function(response){
                    if (response.status == 200)
                    {
                        return resolve({error:false,message:"",data:response.data.data});
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
    this.downloadFile = function(fileId)
    {

        //$http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/firms/'+fileId+'/sendFile')
        return $http({
            url: UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/firms/'+fileId+'/sendFile',
            method: "GET",
            //data: binary, //this is your json data string
            headers: {
                'Content-type': 'application/binary'
            },
            responseType: 'arraybuffer'
        })
    };//https://github.com/eligrey/FileSaver.js/
    
    
    return this;
});
