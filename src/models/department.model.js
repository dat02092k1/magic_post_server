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

departmentSchema.pre("remove", async function (next) {
  try {
    // remove users related to department  update status order related to department
    await User.deleteMany({ departmentId: this._id });

    await Order.deleteMany({
      $or: [
        { send_department: this._id },
        { receive_department: this._id },
        { current_department: this._id, next_department: this._id }
      ]
    });

    next(); // Call next only after both operations have completed
  } catch (err) {
    next(err); // Pass any error to the next middleware
  }
});


module.exports = mongoose.model("Department", departmentSchema);
