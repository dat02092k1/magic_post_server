const Department = require("../models/department.model");
const User = require("../models/user.model");
const { Api403Error, Api404Error } = require("../rest_core/error.response");
const UtilFunc = require("../utils/utils");
const bcrypt = require("bcrypt");
const UtilConstant = require("../utils/constants");

class DepartmentService {
  static get = async (query) => {
    query = UtilFunc.getQuery(query);

    var limit = parseInt(query.limit, 10);
    limit = isNaN(limit) ? 10 : limit;

    const departments = await Department.find(query.condition)
      .limit(limit)
      .sort(query.sort);

    return {
      departments: departments,
    };
  };

  static create = async (data) => {
    const { department, user } = data;

    const holderUser = await User.findOne({ email: user.email }).lean();

    if (holderUser) throw new Api404Error("this user existed");
    console.log(department);
    const checkPoint = await Department.findOne({
      name: department.name,
    }).lean();
     
    if (checkPoint)
      throw new Api403Error("this gathering point already exists");

    const newGatherPoint = new Department(department);

    await newGatherPoint.save();

    if (newGatherPoint.linkDepartments.length > 0) {
      const updatePromises = newGatherPoint.linkDepartments.map(
        async (linkedDepartment) => {
          const departmentToUpdate = await Department.findById(
            linkedDepartment._id
          );
           
          if (departmentToUpdate) {
            departmentToUpdate.linkDepartments.push({
              id: newGatherPoint._id,
              type: newGatherPoint.type,
            });
            await departmentToUpdate.save();
          }
        }
      );

      await Promise.all(updatePromises);
    }

    const hashPassword = await bcrypt.hash(
      user.password,
      UtilConstant.SAL_ROUNDS
    );

    user.password = hashPassword;

    const newUser = new User({
      ...user,
      departmentId: newGatherPoint._id,
    });

    await newUser.save();

    return {
      gatherPoint: newGatherPoint,
      user: UtilFunc.getInfoData({
        fields: ["_id", "username", "role"],
        object: newUser,
      }),
    };
  };

  static getDetail = async (id) => {
    const checkPoint = await Department.findById(id).lean();

    if (!checkPoint) throw new Api404Error("this gather point not found");

    const hdUser = await User.findOne({
      departmentId: id,
      role: `head${checkPoint.type}`,
    }).lean();

    if (!hdUser) {
      return {
        gatherPoint: checkPoint,
        msg: `Điểm ${
          checkPoint.type === "Gathering" ? "tập kết" : "giao dịch"
        } này chưa có trưởng điểnm`,
      };
    }

    return {
      gatherPoint: checkPoint,
      user: UtilFunc.getInfoData({
        fields: ["_id", "name", "email", "role"],
        object: hdUser,
      }),
    };
  };

  static edit = async (id, department) => {
    let checkPoint = await Department.findById(id);

    if (!checkPoint) throw new Api404Error("gather point not found");

    if (checkPoint.type && department.type !== checkPoint.type) {
      const departments = await Department.find({
        linkDepartments: {
          $elemMatch: {
            id: id,
          },
        },
      });

      if (department.type === "Gathering") {
        for (let department of departments) {
          department.linkDepartments = department.linkDepartments.filter(
            (item) => {
              if (item.id === id) {
                item.type = gatherPoint.type;
              }
            }
          );
          await department.save();
        }
      } else {
        for (let department of departments) {
          if (department.type === "Gathering") {
            department.linkDepartments = department.linkDepartments.filter(
              (item) => {
                if (item.id === id) {
                  item.type = gatherPoint.type;
                }
              }
            );
          }

          if (department.type === "Transaction") {
            department.linkDepartments = department.linkDepartments.filter(
              (item) => item.id !== id
            );
          }
          await department.save();
        }
      }

      const staffUsers = await User.find({
        departmentId: checkPoint._id,
        role: `${checkPoint.type.toLowerCase()}Staff`,
      });

      if (staffUsers.length > 0) {
        for (let user of staffUsers) {
          if (user.role === `${checkPoint.type.toLowerCase()}Staff`) {
            user.role = `${department.type.toLowerCase()}Staff`;
          } else {
            user.role = `head${department.type}`;
          }
          await user.save();
        }
      }
    }

    if (department.linkDepartments) {
      checkPoint.linkDepartments = [...department.linkDepartments];

      const linkedDepartmentsToUpdate = await Department.find({
        linkDepartments: {
          $not: {
            $elemMatch: {
              _id: checkPoint._id.toString(),
            },
          },
        },
      });

      // Update linkDepartments in each linked department
      for (const linkedDepartment of linkedDepartmentsToUpdate) {
        linkedDepartment.linkDepartments.push({
          _id: checkPoint._id.toString(),
          type: checkPoint.type,
        });
        await linkedDepartment.save();
      }
    }

    delete department.linkDepartments;

    checkPoint = UtilFunc.updateObj(checkPoint, department);

    await checkPoint.save();

    return {
      gatherPoint: checkPoint,
    };
  };

  static delete = async (id) => {
    const checkPoint = await Department.findById(id);

    if (!checkPoint) throw new Api404Error("gather point not found");

    await Department.findByIdAndDelete(id);

    const departments = await Department.find({
      linkDepartments: {
        $elemMatch: {
          id: id,
        },
      },
    });

    for (let department of departments) {
      department.linkDepartments = department.linkDepartments.map((item) => {
        if (item.id !== id) {
          return item;
        }
      });

      await department.save();
    }

    return {
      gatherPoint: checkPoint,
    };
  };
}

module.exports = DepartmentService;
