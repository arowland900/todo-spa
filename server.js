require('dotenv').config() 

const
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  Todo = require('./models/Todo'),
  PORT = 3000

mongoose.connect(process.env.MONGODB_URI, (err) => {
  console.log(err || "Connected to MongoDB.")
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.static('public'));


app.get("/api/todos", (req, res) => {
  Todo.find({}, (err, todosFromDB) => {
    if(err) return console.log(err)
    res.json(todosFromDB)
  })
})

app.get("/api/todos/:id", (req, res) => {
  Todo.findById({ _id: req.params.id }, (err, todoFromDB) => { 
    if(err) return console.log(err)
    res.json(todoFromDB); 
  });
})

app.post("/api/todos", (req, res) => {
  Todo.create(req.body, (err, newTodoItem) => {
    if(err) return console.log(err)
    res.json(newTodoItem)
  })
})

app.delete("/api/todos/:id", (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) return console.log(err);
    res.json({ message: "todo item deleted" })
  });
})

app.patch("/api/todos/:id", (req, res) => {
  Todo.findById({_id: req.params.id}, (err, todoItem) => { 
      if(err) return console.log(err)
      todoItem.completed = !todoItem.completed
      todoItem.save((err, updatedTodo) => {
        if(err) return console.log(err)
        res.json({ message: "item updated!", todo: updatedTodo })
      })
  })
})


app.listen(PORT, (err) => {
  console.log(err || `Server running on port ${PORT}.`)
})