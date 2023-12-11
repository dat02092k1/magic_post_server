const mongoose = require('mongoose');
const UtilConstant = require('../utils/constants');

const oderSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    senderPhone: { 
        type: String,
    }, 
    receiverPhone: {
        type: String,
    }, 
    type: { 
        type: String,
        enum: UtilConstant.typeOrder,
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
        required: true,
    },
    description: {
        type: String,
        required: true, 
    }, 
    price: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: UtilConstant.statusOrder,
    },
    weight: {
        type: String,
        default: '0 - 5kg', 
    },
    expectedDate:{
        type: Date,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('GatheringPoint', oderSchema);

