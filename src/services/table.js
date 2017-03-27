/**
 * Created by user on 22.03.2017.
 */
kmkya_client.service('table_service', function ($http,UrlConfig,$q,tables) {

    
    let query = function (tableName){
        this.table = tableName;
        let self = this;

        let add =(object)=>
            $q(function(resolve, reject) {
                $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/'+self.table+'/insert',object)
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
        
        
        let selectAll = ()=>
             $q(function(resolve, reject) {

                $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/'+self.table+'/all')
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
        
        
        let update = (object)=>
             $q(function(resolve, reject) {

                $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/'+self.table+'/'+object.id+'/update',object)
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
        
        
        let selectBy = (field,value) =>
            $q(function(resolve, reject) {

                $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/'+self.table+'/selectBy/'+field+'/'+value)
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



        let selectById = (id)=>
             $q(function(resolve, reject) {

                $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/'+self.table+'/'+id+'/select')
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

        let remove = (id)=>
             $q(function(resolve, reject) {
                $http.post(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/'+self.table+'/'+id+'/delete')
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
        
        
        
        return {
            add,
            update,
            selectAll,
            remove,
            selectBy,
            selectById
        } 
    };
   
    return {query}
    
});