/**
 * Created by user on 07.11.2016.
 */
var tempCtrl = function($scope,$state,$rootScope,$http,UrlConfig,sweetAlert) {


    let showError = ()=>{
        sweetAlert.swal(
            {
                title: 'Ошибка',
                text: "Что-то пошло не так или что-то не так выбрано",
                type: 'error',
                timer:5000
            }
        ).done();
    }
    
   $scope.sendRequest = (url,body,requestType)=>{


       let fullurl = UrlConfig.serverUrl+":"+UrlConfig.serverPort+url;
       try {
           if (requestType=='GET')
           {
               $http.get(fullurl)
                   .then((result)=>{
                       $scope.requestResult = JSON.stringify(result);
                   })
                   .catch(()=>{
                       $scope.requestResult = e;
                       showError();
                   });
           } else
           if (requestType=='POST')
           {
               $http.post(fullurl,JSON.parse(body))
                   .then((result)=>{
                       $scope.requestResult = JSON.stringify(result);
                   })
                   .catch(()=>{
                       $scope.requestResult = e;
                       showError();
                   });
           } else
           {
               $scope.requestResult = e;
               showError();
           }

       }
       catch (e)
       {
           $scope.requestResult = e;
           showError();
       }

   }
};

kmkya_client.controller('tempCtrl',tempCtrl);



