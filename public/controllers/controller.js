/*
Author:Neeraj Lohumi
feature:using this app we can easily add/delete contact data to the mongodb
*/
var myapp=angular.module('myapp',[]);
myapp.controller('AppCtrl',['$scope','$http',function($scope,$http){
	
	var refresh=function(){
	$http.get('/contactlist').then(function(response){
		/*var data = response.data;
	    var status = response.status;
	    var statusText = response.statusText;
	    var headers = response.headers;
	    var config = response.config;*/

  		$scope.contactlist = response.data;
  		
	});
	};
	refresh();
	$scope.addcontact=function(){
		
		$http.post('/contactlist',$scope.contact).then(function(response){
			console.log(response.data);
			$scope.contact="";
			refresh();
		});
	};
	$scope.remove=function(id){
		console.log(id);
		$http.delete('/contactlist/'+ id).then(function(){
			refresh();
		});
	};
	$scope.Edit=function(id){
		$http.get('/contactlist/'+ id).then(function(response){
			$scope.contact = response.data; //use response or response.data based on angular version
		});
	};
	$scope.update=function(id){
		$http.put('/contactlist/'+ $scope.contact._id,$scope.contact)
		.then(function(response){
			$scope.contact="";
			refresh(); 
		});
	};

}]);

