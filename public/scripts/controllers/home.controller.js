myApp.controller('HomeController', ['TaskFactory', function(TaskFactory){
  console.log('HomeController was loaded');
  var self= this;
  self.specialMessage = 'This site is amazing!';
  self.messageFromFactory = TaskFactory.testProperty;
  self.arrayFromFactory = TaskFactory.testArray; 

}]); // end home controller
