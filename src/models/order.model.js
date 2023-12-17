const mongoose = require('mongoose');
const UtilConstant = require('../utils/constants');

const oderSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    senderPhone: { 
        type: String,
        required: true
    }, 
    receiverPhone: {
        type: String,
        required: true
    }, 
    type: { 
        type: String,
        enum: UtilConstant.typeOrder,
    },
    addess: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },  
    send_department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    }, 
    receive_department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    current_department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    },
    next_department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    },
    orderNotice: {
        type: String,
        default: ''
    },
    description: {
        type: Array,
        default: [],
    }, 
    price: {
        type: Number,
        required: true,
    }, 
    COD: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: UtilConstant.statusOrder,
    },
    weight: {
        type: Number,
        required: true,
    },
    expectedDate:{
        type: Date,
        default: () => Date.now() + 7 * 24 * 60 * 60 * 1000, 
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('orders', oderSchema);

