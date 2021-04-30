const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todo-list-2021', { useNewUrlParser: true }, (error) => {
    if (error) {
        throw error
    } else { console.log('Connected to MongoDB') }
})

module.exports = mongoose