/**
 * Created by user on 28.07.2016.
 */

kmkya_client.factory('SocketIO', function ($rootScope,UrlConfig) {

    var socket = io.connect(UrlConfig.socketUrl+':'+UrlConfig.socketPort);
    return socket;

});