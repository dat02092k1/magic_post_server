const Department = require("../models/department.model");
const User = require("../models/user.model");
const { Api403Error, Api404Error } = require("../rest_core/error.response");
const UtilFunc = require("../utils/utils");

class DepartmentService {
  static get = async (query) => {
    query = UtilFunc.getQuery(query);

    var limit = parseInt(query.limit, 10);
    limit = isNaN(limit) ? 10 : limit;

    const departments = await Department.find(query.condition).limit(limit).sort(query.sort);

    return {
      departments: departments,
    };
  };

  static create = async (data) => {
    const { department, user } = data;

    const holderUser = await User.findOne({ email: user.email }).lean();

    if (holderUser) throw new Api404Error("this user existed");

    const checkPoint = await Department.findOne({ name: department.name }).lean();

    if (checkPoint)
      throw new Api403Error("this gathering point already exists");

    const newGatherPoint = new Department(checkPoint);

    await newGatherPoint.save();

    const newUser = new User({
      ...user,
      departmentId: newGatherPoint._id,
    });

    await newUser.save();

    return {
      gatherPoint: newGatherPoint,
      user: UtilFunc.getInfoData({fields: ['_id', 'username', 'role'], object: newUser}),
    };
  };

  static getDetail = async (id) => {
    const checkPoint = await Department.findById(id).lean();

    if (!checkPoint) throw new Api404Error("this gather point not found");

    return {
      gatherPoint: (checkPoint),
    };
  };

  static edit = async (id, gatherPoint) => {
    let checkPoint = await Department.findById(id);

    if (!checkPoint) throw new Api404Error("gather point not found");

    if (checkPoint.type && gatherPoint.type !== checkPoint.type) {
      const departments = await Department.find({
        linkDepartments: {
          $elemMatch: {
            id: id,
          },
        },
      });

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
    }
    console.log('flag');
    if (gatherPoint.linkDepartments) {
      console.log(checkPoint.linkDepartments);
      console.log(gatherPoint.linkDepartments);
      checkPoint.linkDepartments = [...gatherPoint.linkDepartments];
    }

    delete gatherPoint.linkDepartments;

    checkPoint = UtilFunc.updateObj(checkPoint, gatherPoint);

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
