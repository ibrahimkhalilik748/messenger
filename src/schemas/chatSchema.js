const mongoose = require('mongoose');



const chatSchema = mongoose.Schema({
    message: {
        type: String,
        require: true
    }
})


module.exports = chatSchema;