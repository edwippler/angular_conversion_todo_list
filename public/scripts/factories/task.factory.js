myApp.factory('TaskFactory',['$http', function($http){
  var testArrayVariable = ['queso', 'bagel', 'donald bagel', 'salsa', 'Carolyn'];
  testArrayVariable.pop();

  var factoryTasks = { list: [] };

  getTasks();

  function getTasks() {
    $http({
      method: 'GET',
      url: '/tasks'
    }).then(function(response){
      console.log(response.data);
      factoryTasks.list = response.data;
    });
  }


//this is the public API, if it's not in here, the controller won't see it.
  return {
    testProperty: 'taco',
    testArray: testArrayVariable,
    allTasks: factoryTasks,
    editTasks: getTasks
  };
}]);
