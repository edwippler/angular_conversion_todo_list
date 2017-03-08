myApp.controller('TaskController', ['$http',  function($http){
  console.log('task controller was created');
  var self = this;
  self.newTask = {};
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

self.addTask = function() {
  $http({
    method: 'POST',
    url: '/tasks',
    data: self.newTask
  }).then(function(response){
    console.log(response);
    getTasks();
  });
}

self.deleteTask = function(id) {
  $http({
    method: 'DELETE',
    url: '/tasks/' + id
  }).then(function(response){
    getTasks();
  });
}

self.updateTask = function(id) {
  $http({
    method: 'PUT',
    url: '/tasks/complete/' + id
  }).then(function(response){
    getTasks();
  });
}

self.revertTask = function(id) {
  $http({
    method: 'PUT',
    url: '/tasks/revert/' + id
  }).then(function(response){
    getTasks();
  });
}

}]); //end task controller
