/**
 * Created by user on 03.08.2016.
 */

kmkya_client.service('direction_category_service', function ($http,UrlConfig) {

    this.selectAll = function()
    {
        return $http.get(UrlConfig.serverUrl+':'+UrlConfig.serverPort+'/api/direction_category');
    };

    this.selectById = function()
    {
        alert('selectById');
    };

    this.save = function()
    {
        alert('save');
    };

    this.add = function()
    {
        alert('add');
    };
    
    this.delete = function()
    {
        alert('delete');
    };    
    
    


        return this;
});

