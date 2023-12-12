const User = require('../models/user.model');
const {Api403Error, Api404Error, Api401Error} = require('../rest_core/error.response');
const mailing = require('../helpers/mail');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const UtilFunc = require("../utils/utils");
const UtilConstants = require("../utils/constants");
const UtilConstant = require("../utils/constants");

class AuthService {
    static login = async (userData) => {
        const {email, password} = userData;
         
        const user = await User.findOne({email: email}).populate('departmentId').lean();

        if (!user) throw new Api404Error('User not exists');
        console.log(password, user.password);
        const match = await bcrypt.compare(password, user.password);

        if (!match) throw new Api401Error('Wrong password');

        return {
            user: UtilFunc.getInfoData({ fields: ['_id', 'name', 'email', 'role', 'phone', 'gender', 'departmentId'], object: user }),
            token: UtilFunc.generateAccessToken(user)
        }
    }

    static forgetPassword = async (email) => {
        const checkUser = await User.findOne({email: email}).lean();

        if (!checkUser) throw new Api403Error('User not exists');

        const token = jwt.sign({userId: checkUser._id}, process.env.JWT_PASSWORD, {expiresIn: '1h'});

        const to = checkUser.email;

        const subject = "Reset password request";

        const html = `<div>
            Mã xác thực của bạn có thời hạn trong 1 giờ: 
            <br> 
             <b>${token}</b>
            <br>
            <a href="${process.env.CLIENT_URL}/reset-password/${checkUser._id}">Nhấn vào đây để thiết lập mật khẩu mới</a>
            </div>`;

        await mailing(to, subject, html);

        return {
            user: UtilFunc.getInfoData({fields: ['_id', 'username', 'role'], object: checkUser}),
        };
    }

    static checkVerifyCode = async (information) => {
        const { token, password } = information;
        console.log(information);
        if (!token) throw new Api403Error('Token is required');

        const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
        console.log(decoded);
        const user = await User.findById(decoded.userId);

        if (!user) throw new Api404Error('User not found');

        const hashedPassword = await bcrypt.hash(password, UtilConstants.SAL_ROUNDS);

        user.password = hashedPassword;

        await user.save();

        return {
            user: UtilFunc.getInfoData({fields: ['_id', 'username', 'role'], object: user}),
        }
    }
}

module.exports = AuthService;