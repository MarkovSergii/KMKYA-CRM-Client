/**
 * Created by user on 03.08.2016.
 */

kmkya_client.service('direction_category_service', function ($http,UrlConfig) {

    this.selectAll = function()
    {
        return $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/dictionary/exhibitionCategory/all');
    };

    this.selectById = function()
    {
        //        /api/dictionary/exhibitionCategory/:id/select
        alert('selectById');
    };

    this.update = function()
    {
        // /api/dictionary/exhibitionCategory/:id/update
        alert('update');
    };

    this.add = function()
    {
        // /api/dictionary/exhibitionCategory/insert
        alert('add');
    };
    
    this.delete = function()
    {
        // /api/dictionary/exhibitionCategory/:id/delete
        alert('delete');
    };    
    
    


        return this;
});

