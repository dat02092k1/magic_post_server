const mongoose = require('mongoose');
const User = require('./user.model');
const UtilConstant = require("../utils/constants");
// const gatheringPointSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     place: {
//         type: String,
//         required: true,
//     },  
//     childTracsactionPoint: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'TransactionPoint'
//     }], 
//     linkGatheringPoint: {
//         type: Array,
//         default: [],
//     }
// });

// module.exports = mongoose.model('GatheringPoint', gatheringPointSchema);

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },  
    region: {
        type: String,
        required: true,
    }, 
    type: {
        type: String,
        enum: UtilConstant.typeDepartment,
        required: true,
    },
    linkDepartments: [{
        id: {
            type: String,
        },
        type: {
            type: String,
        },
    }], 
});

departmentSchema.pre('remove', function (next) {
      User.deleteMany(
      { departmentId: this._id},
    )
      .then(() => next())
      .catch(err => next(err));
  });

module.exports = mongoose.model('Department', departmentSchema);