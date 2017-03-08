var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'phi-tasks',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

// get all tasks
router.get('/', function(req, res) {
  console.log('hit my get all tasks route');
  pool.connect(function(err, client, done) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      // SELECT * FROM task;
      client.query('SELECT * FROM task ORDER BY id;', function(err, result) {
        done(); // close the connection db

        if(err){
          console.log(err);
          res.sendStatus(500); // the world exploded
        }else{
          console.log(result.rows);
          res.status(200).send(result.rows);
        }
      });
    }
  });
});

// create a new task in the db
router.post('/', function(req, res) {
  console.log('hit post route');
  console.log('here is the body ->', req.body);

  var taskObject = req.body;

  // db query
  // INSERT INTO task (name) VALUES ('test');
  pool.connect(function(err, client, done) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      client.query('INSERT INTO task (name) VALUES ($1);',
        [taskObject.taskName], function(err, result) {
          done();
          if(err){
            console.log(err);
            res.sendStatus(500); // the world exploded
          }else{
            res.sendStatus(201);
          }
      });
    }
  });
});

//delete task
router.delete('/:id', function(req, res) {
  var taskToDeleteID = req.params.id;
  console.log('hit delete route');
  console.log('here is the id to delete ->', taskToDeleteID);
  // db query
  // DELETE FROM task WHERE id = 6; ;
  pool.connect(function(err, client, done) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      client.query('DELETE FROM task WHERE id = $1 ;',
        [taskToDeleteID], function(err, result) {
          done();
          if(err){
            console.log(err);
            res.sendStatus(500); // the world exploded
          }else{
            res.sendStatus(202);
          }
      });
    }
  });
});

//update task
router.put('/complete/:id', function(req, res) {
  var completedTask = req.params.id;
  console.log('hit update route');
  console.log('here is the id to update ->', completedTask);
  // db query
  // UPDATE task SET status = true WHERE id = 7;  ;
  pool.connect(function(err, client, done) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      client.query('UPDATE task SET status = true WHERE id = $1 ; ',
        [completedTask], function(err, result) {
          done();
          if(err){
            console.log(err);
            res.sendStatus(500); // the world exploded
          }else{
            res.sendStatus(201);
          }
      });
    }
  });
});

//update task - back to false
router.put('/revert/:id', function(req, res) {
  var revertTask = req.params.id;
  console.log('hit delete route');
  console.log('here is the id to revert ->', revertTask);
  // db query
  // UPDATE task SET status = true WHERE id = 7;  ;
  pool.connect(function(err, client, done) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      client.query('UPDATE task SET status = false WHERE id = $1 ; ',
        [revertTask], function(err, result) {
          done();
          if(err){
            console.log(err);
            res.sendStatus(500); // the world exploded
          }else{
            res.sendStatus(201);
          }
      });
    }
  });
});

module.exports = router;
