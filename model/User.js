const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true,
        min: 8
    }
})

module.exports = mongoose.model('SaltBackend',userSchema);