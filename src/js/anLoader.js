'use strict';

let anLoader = angular.module('anLoader', []);

anLoader.factory('serviceAnLoader', ($rootScope, $window) => {

    angular.element($window).bind('resize', ()=> {
        this.calc(this.id);
    });

    this.calc = (id)=> {
        this.id = id;
        this.elem = angular.element(document.querySelector('#' + id))[0];
        this.bk = angular.element(document.querySelector('#BGoverlay'))[0];
        if (this.bk && this.elem) {

            this.bk.style.width = this.elem.clientWidth + 'px';
            this.bk.style.height = this.elem.clientHeight + 'px';
            this.bk.style.top = this.elem.offsetParent.offsetTop + 'px';
            this.bk.style.left = this.elem.offsetLeft + 'px';
        } else
        if (this.bk){
            this.bk.style.width = '100%';
            this.bk.style.height = '100%';
            this.bk.style.top = '0px';
            this.bk.style.left = '0px';
        }

    };

    $rootScope.$watch('showState', (newValue, oldValue) =>  this.calc(this.id));



    this.start = ()=> {
        this.calc(this.id);
        $rootScope.showState = 'show';
    };

    this.stop =  () => $rootScope.showState = '';

    return this
});

anLoader.directive('anLoader', (serviceAnLoader,$rootScope) => {
    return {
        restrict: 'E',
        link: (scope, element, attrs) => {
            serviceAnLoader.calc(attrs.id);
            scope.anLoader_getContentUrl = function () {
                return (attrs.templatefolder || 'templates')+'/'+ attrs.loaderType + '.html'
            };
            $rootScope.anLoader_http = attrs.http || false;
        },
        template: '<div ng-include="anLoader_getContentUrl()"></div>'
    }
});


anLoader.config(['$httpProvider',function($httpProvider) {
        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;

        //Remove the header used to identify ajax call  that would prevent CORS from working
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $httpProvider.interceptors.push(function ($rootScope) {
            return {
                'request': function (config) {

                    if ($rootScope.anLoader_http == "true") $rootScope.showState = 'show';
                    return config;
                },
                'requestError': function (rejection) {
                    // do something on error
                    if ($rootScope.anLoader_http == "true") $rootScope.showState = '';
                   /* if (canRecover(rejection)) {
                        return responseOrNewPromise
                    }*/
                    return $q.reject(rejection);
                },
                'response': function (response) {
                    // do something on success
                    if ($rootScope.anLoader_http == "true") $rootScope.showState = '';
                    return response;
                },

                // optional method
                'responseError': function (rejection) {
                    // do something on error
                    if ($rootScope.anLoader_http == "true") $rootScope.showState = '';
                   /* if (canRecover(rejection)) {
                        return responseOrNewPromise
                    }*/
                    return $q.reject(rejection);
                }
            };
        });
}]);