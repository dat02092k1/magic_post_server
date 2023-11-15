const mongoose = require('mongoose');

const transactionPointSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    place: {             
        type: String,
        required: true,
    },  
    gatheringPointId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'GatheringPoint',
        index: true
    },
});

module.exports = mongoose.model('TransactionPoint', transactionPointSchema);