const mongoose = require("mongoose");
const User = require("./user.model");
const UtilConstant = require("../utils/constants");

const departmentSchema = new mongoose.Schema(
  {
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
    linkDepartments: [
      {
        departmentId: {
          type: String,
        },
        type: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

departmentSchema.pre("remove", function (next) {
  User.deleteMany({ departmentId: this._id })
    .then(() => next())
    .catch((err) => next(err));
});

module.exports = mongoose.model("Department", departmentSchema);
