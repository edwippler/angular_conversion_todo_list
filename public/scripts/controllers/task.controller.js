myApp.controller('TaskController', ['$http', 'TaskFactory', function($http, TaskFactory){
  console.log('task controller was created');
  var self = this;
  self.newTask = {};
  self.taskList = TaskFactory.allTasks;


self.addTask = function() {
  $http({
    method: 'POST',
    url: '/tasks',
    data: self.newTask
  }).then(function(response){
    console.log(response);
    TaskFactory.editTasks();
    self.newTask = {};
  });
}

self.deleteTask = function(id) {
  $http({
    method: 'DELETE',
    url: '/tasks/' + id
  }).then(function(response){
    TaskFactory.editTasks();
  });
}

self.updateTask = function(id) {
  $http({
    method: 'PUT',
    url: '/tasks/complete/' + id
  }).then(function(response){
    TaskFactory.editTasks();
  });
}

self.revertTask = function(id) {
  $http({
    method: 'PUT',
    url: '/tasks/revert/' + id
  }).then(function(response){
    TaskFactory.editTasks();
  });
}

}]); //end task controller
