const mongoose = require('mongoose');
const UtilConstant = require('../utils/constants');

const orderSchema = new mongoose.Schema({
    from: {
        name: String,
        address: String,
        require: true
    },
    to: {
        name: String,
        address: String,
        require: true
    },
    state: String,
    currentLocation: String,
});

module.exports = mongoose.model('Order', orderSchema);