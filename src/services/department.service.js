const Department = require("../models/department.model");
const User = require("../models/user.model");
const { Api403Error, Api404Error } = require("../rest_core/error.response");
const UtilFunc = require("../utils/utils");
const bcrypt = require("bcrypt");
const UtilConstant = require("../utils/constants");
const { cloudinary } = require("../helpers/cloudinary");

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

  static create = async (data, file) => {
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
            linkedDepartment.departmentId
          );

          if (departmentToUpdate) {
            departmentToUpdate.linkDepartments.push({
              departmentId: newGatherPoint._id,
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

    if (file) {
      if (!file.mimetype.startsWith('image/')) throw new Api403Error('Only image files are allowed');

      cloudinary.uploader.upload(file.path, 
        {
          folder: 'File_img_CVHT_UET'
        }, (error, result) => {
        if (error) {
          console.log('Error uploading image', error);
          throw new Api404Error('Error uploading image');
        } else {
          console.log('Image uploaded successfully', result);
          user.avatarUrl = result.secure_url;
        }
      }
      ); 
    }

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

    if (!checkPoint) throw new Api404Error("this department not found");

    if (checkPoint.linkDepartments.length > 0) {
      for (const item of checkPoint.linkDepartments) {
        const dep = await Department.findById(item.departmentId).lean();
        item["name"] = dep.name;
    }
    
    }

    const hdUser = await User.findOne({
      departmentId: id,
      role: `head${checkPoint.type}`,
    }).lean();

    if (!hdUser) {
      return {
        gatherPoint: checkPoint,
        msg: `Điểm ${checkPoint.type === "Gathering" ? "tập kết" : "giao dịch"
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
    
    if (department.type && department.type !== checkPoint.type) {
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
      } 
                          
      if (department.type === "Transaction") {
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
      const dsList = [...checkPoint.linkDepartments];
      checkPoint.linkDepartments = [...department.linkDepartments];

      if (department.linkDepartments.length > 0) {
        const removeLs = [];

        console.log('ds flag');
        console.log(dsList)
        for (const ds of dsList) {
          const targetDep = await Department.findById(ds.departmentId);    
          targetDep.linkDepartments = targetDep.linkDepartments.filter((item) => item.departmentId !== checkPoint._id.toString());
          console.log(targetDep.linkDepartments);
          await targetDep.save();      
          // if (department.linkDepartments.findIndex((item) => item.departmentId === ds.departmentId) === -1) {
          //   removeLs.push(ds);
          // }
        }

        // if (removeLs.length > 0) {
        //   console.log(removeLs);
        //   for (let ds of removeLs) {
        //     console.log(ds);
        //     const dsToRemove = await Department.findById(ds.departmentId);
        //     dsToRemove.linkDepartments = dsToRemove.linkDepartments.filter((item) => item.departmentId !== checkPoint._id.toString());
        //     await dsToRemove.save();
        //   }
        // }
        console.log('add flag');
        const linkedDepartmentsToUpdate = await Department.find({
          linkDepartments: {
            $not: {
              $elemMatch: {
                departmentId: checkPoint._id.toString(),
              },
            },
          },
        });
        console.log(linkedDepartmentsToUpdate);
        const mapId = department.linkDepartments.map((item) => item.departmentId.toString());
        // Update linkDepartments in each linked department
        for (const linkedDepartment of linkedDepartmentsToUpdate) {
          if (linkedDepartment._id.toString() === checkPoint._id.toString() || !(mapId.includes(linkedDepartment._id.toString()))) continue;
            console.log('heh');
          console.log(checkPoint._id.toString());
          linkedDepartment.linkDepartments.push({
            departmentId: checkPoint._id.toString(),
            type: checkPoint.type,
          });

          await linkedDepartment.save();
        }
      }
      else {
        console.log(checkPoint._id.toString());
        const linkedDepartmentsToUpdate = await Department.find({
          linkDepartments: {
            $elemMatch: {
              departmentId: checkPoint._id.toString(),
            },
          },
        });
        console.log('delete flag');
        console.log(linkedDepartmentsToUpdate);
        console.log('heh1');
        if (linkedDepartmentsToUpdate.length > 0) {
          console.log('heh2');
          for (const linkedDepartment of linkedDepartmentsToUpdate) {
            linkedDepartment.linkDepartments = linkedDepartment.linkDepartments.filter((item) =>
              item.departmentId !== checkPoint._id.toString()
            );
            console.log('filter done');
            // linkedDepartment.linkDepartments.remove({
            //   departmentId: checkPoint._id.toString(),
            //   type: checkPoint.type,
            // });
            console.log(linkedDepartment.linkDepartments);
            await linkedDepartment.save();
          }
        }
      }
    }

    delete department.linkDepartments;

    checkPoint = UtilFunc.updateObj(checkPoint, department);

    await checkPoint.save();

    return {
      gatherPoint: checkPoint,
    };
  };

  static delete = async (departmentId) => {
    const checkPoint = await Department.findById(departmentId);

    if (!checkPoint) throw new Api404Error("gather point not found");

    await Department.findByIdAndDelete(departmentId);

    const departments = await Department.find({
      linkDepartments: {
        $elemMatch: {
          departmentId: departmentId,
        },
      },
    });

    for (let department of departments) {
      department.linkDepartments = department.linkDepartments.filter((item) =>
        item.departmentId !== checkPoint._id.toString()
      );

      await department.save();
    }

    return {
      gatherPoint: checkPoint,
    };
  };
}

module.exports = DepartmentService;
