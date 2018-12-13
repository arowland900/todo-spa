const mongoose = require('mongoose')
  
const todoSchema = new mongoose.Schema({
    body: String,
    completed: false
}, { timestamps: true })

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo;