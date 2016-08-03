/**
 * Created by user on 29.07.2016.
 */

kmkya_client.config(['$httpProvider',function($httpProvider) {

    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header used to identify ajax call  that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.interceptors.push(function($rootScope,$cookies) {
        return {
            'request': function(config) {
                config.headers['authorization'] = $cookies.get('token');
                return config;
            }
        };
    });

}]);