-- create db table
CREATE TABLE task (
  id SERIAL PRIMARY KEY,
  name VARCHAR(240),
  status BOOLEAN DEFAULT false
);

-- test dummy data
INSERT INTO task (name) VALUES ('test');
INSERT INTO task (name) VALUES ('route to get data out of db');
INSERT INTO task (name) VALUES ('sleep');
