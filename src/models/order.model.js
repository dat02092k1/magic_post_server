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
    targetPlace: {
        type: String,
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
    weigh: {
        type: String,
        default: '0 - 5kg', 
    },
    orderChild: {
        type: Array,
        default: [],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('GatheringPoint', oderSchema);

