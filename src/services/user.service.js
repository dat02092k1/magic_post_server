const User = require("../models/user.model");
const { Api403Error, Api404Error } = require("../rest_core/error.response");
const UtilConstant = require("../utils/constants");
const UtilFunc = require("../utils/utils");
const bcrypt = require("bcrypt");

class UserService {
  static create = async (userDetails) => {
    const { email, password } = userDetails;

    const checkUser = await User.findOne({ email: email }).lean();
    if (checkUser) throw new Api403Error("username already exists");

    const hashPassword = await bcrypt.hash(password, UtilConstant.SAL_ROUNDS);

    const user = new User(userDetails);
    user.password = hashPassword;
    await user.save();
    return {
      user: UtilFunc.getInfoData({
        fields: ["_id", "name", "email", "role"],
        object: user,
      }),
      token: UtilFunc.generateAccessToken(user),
    };
  };

  static getDetail = async (id) => {
    const holderUser = await User.findById(id).populate("departmentId").lean();

    if (!holderUser) throw new Api404Error("user not found");

    return {
      user: UtilFunc.getInfoData({
        fields: ["_id", "departmentId", "name", "email", "role"],
        object: holderUser,
      }),
    };
  };

  static edit = async (id, user) => {
    let userData = await User.findById(id);
    if (!userData) throw new Api404Error("user not found");

    userData = UtilFunc.updateObj(userData, user);

    await userData.save();
  };

  static delete = async (id) => {
    const targetUser = await User.findByIdAndDelete(id);

    if (!targetUser) throw new Api404Error("user not found");

    return {
      user: targetUser,
    };
  };

  static getByCondition = async (query) => {
    //query = UtilFunc.getQuery(query);

    var limit = parseInt(query.limit, 10);
    limit = isNaN(limit) ? 10 : limit;
    const users = await User.find(query.condition)
      .limit(limit)
      .sort(query.sort);

    return {
      users: users,
    };
  };

  static deleteUsersByCondition = async (condition) => {
    console.log(condition);
    if (!condition || typeof condition !== 'object') throw new Api403Error("Invalid condition provided"); 

    const targetUsers = await User.deleteMany(condition);

    if (!targetUsers) throw new Api404Error("delete failed");

    return {
      user: targetUsers,
    };
  }
}

module.exports = UserService;
