const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Create Category Schema
let user = new Schema({
    name: {
        type: String
    },
    Email: {
        type: String
    },
    city: {
        type: String
    },
    password: {
        type: String
    },
    DOB: {
        type: String
    },
    
});

module.exports = mongoose.model('user', user);