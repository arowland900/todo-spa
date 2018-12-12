require('dotenv').config()

const
    express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    Todo = require('./models/Todo'),
    PORT = 3000

mongoose.connect(process.env.MONGODB_URI, (err) => {
    console.log(err || "Connected to MongoDB")
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.static('public'));

app.listen(PORT, (err) => {
    console.log(err || `Server running on port ${PORT}`)
})