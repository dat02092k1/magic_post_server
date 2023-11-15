const mongoose = require('mongoose');
const UtilConstant = require('../utils/constants');

const orderDetailsSchema = new mongoose.Schema({
    parentOrderId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Order',
        index: true
    },
    receivePlace: {
        type: String,
    },
    targetPlace: {
        type: String,
    },  
    description: {
        type: String,
        required: true, 
    }, 
    status: {
        type: String,
    },              
    transportJourney: {
        type: String,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('OrderDetails', orderDetailsSchema);