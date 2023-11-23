const mongoose = require('mongoose');
const UtilConstant = require('../utils/constants');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    email: {
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
        required: true    
    }, 
    avatarUrl: {
        type: String,
        default: '',
    }
});

module.exports = mongoose.model('User', userSchema);
