/**
 * Created by user on 03.08.2016.
 */

kmkya_client.service('direction_category_service', function ($http,UrlConfig,$q) {

    this.selectAll = function()
    {
        return $q(function(resolve, reject) {

            $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/exhibitionCategory/all')
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
        return $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/exhibitionCategory/'+id+'/select');
    };

    this.update = function(direction_category)
    {
        return $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/exhibitionCategory/'+direction_category.id+'/update',direction_category);
    };

    this.add = function(direction_category)
    {
        return $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/exhibitionCategory/insert',direction_category);
    };
    
    this.delete = function(id)
    {
        return $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/exhibitionCategory/'+id+'/delete');
    };    
    
    


        return this;
});

