const sqlite3 = require('sqlite3').verbose();

// BACKEND FILE FOR MY DATABASES QUERIES


const addingTask = (data) => {
    let db = new sqlite3.Database('db/db.taskmanager');
    
    // db.run(`INSERT INTO movie (title, url, type, year) VALUES ("terminator", "enroule.jpg", "film", "sdlfn")`, function(err) {
    db.run(`INSERT INTO tasksmanager (input) VALUES (?)`, [data.data], function(err) {
        if (err) {
          return console.log(err);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
    
    db.close();
  
  }

  const gettingTask = (req, res) => {

    let sendData = {allTask:[]};
    
  
    let db = new sqlite3.Database('db/db.taskmanager', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the movies database.');
    });
     db.serialize(() => {
      db.each(`SELECT * FROM tasksmanager`, (err, row) => {
        if (err) {
          console.error(err.message);
        }
        
          sendData.allTask.push(row);
      
        
        
  
      });
       //res.send(sendData)
    });
  
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      
      res.send(sendData);
      console.log('Close the database connection.');
    });
  
  }


const deletingTask = (data) => {
  let db = new sqlite3.Database('db/db.taskmanager');
  console.log(data)
  // db.run(`INSERT INTO movie (title, url, type, year) VALUES ("terminator", "enroule.jpg", "film", "sdlfn")`, function(err) {
  db.run(`delete from tasksmanager where input = (?)`, [data.input], function(err) {
      if (err) {
        return console.log(err);
      }
      // get the last insert id
  });

  
  db.close();

}


const updatingTask = (done) => {
    let db = new sqlite3.Database('db/db.taskmanager');
    console.log(done);

    let donnee = [[done.isDone],[done.task_id]];
    let sql = `UPDATE tasksmanager SET isDone = ? WHERE task_id = ?`;
  // db.run(`INSERT INTO movie (title, url, type, year) VALUES ("terminator", "enroule.jpg", "film", "sdlfn")`, function(err) {
  db.run(sql, donnee, function(err) {
      if (err) {
        return console.log(err);
      }
      // get the last insert id
  });

  db.close();
}
const updating = (data) => {
  let db = new sqlite3.Database('db/db.taskmanager');
  console.log(data);

  let donnee = [[data.bool],[data.data]];
  let sql = `UPDATE tasksmanager SET isDone = ? WHERE input = ?`;
// db.run(`INSERT INTO movie (title, url, type, year) VALUES ("terminator", "enroule.jpg", "film", "sdlfn")`, function(err) {
db.run(sql, donnee, function(err) {
    if (err) {
      return console.log(err);
    }
    // get the last insert id
});

db.close();
}




exports.addingTask = addingTask;
exports.gettingTask = gettingTask;
exports.deletingTask = deletingTask;
exports.updatingTask = updatingTask;
exports.updating = updating;