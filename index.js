// lib and imports
const express = require("express");
const app = express();

const task = require("./controllers/task")

// app setup
app.use(express.json())
app.use("/static", express.static("public"));
app.set("view engine", "ejs");


// pages
app.get('/',(req, res) => {
  res.render('tasks.ejs');
});

// Create here your api setup
app.post('/api/addtask', (req, res) => {
  task.addingTask(req.body)
});
app.post('/api/gettask', task.gettingTask);

app.post('/api/remtask', (req, res) => {
  task.deletingTask(req.body)
});

app.post('/api/updatetask', (req, res) => {
  task.updatingTask(req.body)
});
app.post('/api/update', (req, res) => {
  task.updating(req.body)
});

app.listen(3000, () => console.log("Server Up and running"));
