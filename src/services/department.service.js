const Department = require("../models/department.model");
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

  static create = async (gatherPoint) => {
    const checkPoint = await Department.findOne({ name: gatherPoint.name }).lean();

    if (checkPoint)
      throw new Api403Error("this gathering point already exists");

    const newGatherPoint = new Department(gatherPoint);

    await newGatherPoint.save();
    return {
      gatherPoint: newGatherPoint,
    };
  };

  static getDetail = async (id) => {
    const checkPoint = await Department.findById(id).lean();

    if (!checkPoint) throw new Api404Error("this gather point not found");

    return {
      gatherPoint: checkPoint,
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
