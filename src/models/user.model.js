const mongoose = require('mongoose');
const UtilConstant = require('../utils/constants');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },  
    role: {
        type: String,
        enum: UtilConstant.roleUsers,
        default: UtilConstant.roleUsers[0],
    }, 
});

module.exports = mongoose.model('User', userSchema);