const mongoose = require('mongoose');

const gatheringPointSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },  
    childTracsactionPoint: {
        type: Array,
        default: [],                  
    }, 
    linkGatheringPoint: {
        type: Array,
        default: [],
    }
});

module.exports = mongoose.model('GatheringPoint', gatheringPointSchema);