var myApp = angular.module('TaskApp', []);

myApp.controller('TaskController', ['$http',  function($http){
  console.log('task controller was created');
  var self = this;
  self.taskList = [];

  // // ajax function
  // function getTasks() {
  //   $.ajax({
  //     type: 'GET',
  //     url: '/tasks',
  //     success: function(response) {
  //       console.log('get tasks response ->', response);
  //       appendTasks(response);
  //     }
  //   });
  // }

  getTasks();

  function getTasks() {
    $http({
      method: 'GET',
      url: '/tasks'
    }).then(function(response){
      console.log(response.data);
      self.taskList = response.data;
    });
  }



}]);
