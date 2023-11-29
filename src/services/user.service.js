const User = require('../models/user.model');
const { Api403Error, Api404Error } = require('../rest_core/error.response');
const UtilConstant = require('../utils/constants');
const UtilFunc = require('../utils/utils');
const bcrypt = require('bcrypt');

class UserService {
    static create = async (userDetails) => {
        const { email, password } = userDetails;

        const checkUser = await User.findOne({ email: email }).lean();
        if (checkUser) throw new Api403Error('username already exists');

        const hashPassword = await bcrypt.hash(password, UtilConstant.SAL_ROUNDS);

        const user = new User(userDetails);
        user.password = hashPassword;
        await user.save();
        return {
            user: UtilFunc.getInfoData({ fields: ['_id', 'username', 'role'], object: user }),
            token: UtilFunc.generateAccessToken(user)
        }
    }

    static getDetail = async (id) => {
        const holderUser = await User.findById(id);

        if (!holderUser) throw new Api404Error('user not found');

        return {
            user: UtilFunc.getInfoData({ fields: ['_id', 'username'], object: holderUser }),
        }
    }

    static edit = async (id, user) => {
        let userData = await User.findById(id);
        if (!userData) throw new Api404Error('user not found');

        userData = UtilFunc.updateObj(userData, user);

        await userData.save();

    }

    static delete = async (id) => {
        const targetUser = await User.findByIdAndDelete(id);

        if (!targetUser) throw new Api404Error('user not found');

        return {
            user: targetUser
        }
    }
}

module.exports = UserService;