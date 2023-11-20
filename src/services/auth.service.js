const User = require('../models/user.model');
const {Api403Error, Api404Error} = require('../rest_core/error.response');
const mailing = require('../helpers/mail');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const UtilFunc = require("../utils/utils");

class AuthService {
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
            <a href="${process.env.CLIENT_URL}/reset-password/${user._id}">Nhấn vào đây để thiết lập mật khẩu mới</a>
            </div>`;

        await mailing(to, subject, html);

        return {
            user: UtilFunc.getInfoData({fields: ['_id', 'username', 'role'], object: checkUser}),
        };
    }

}

module.exports = AuthService;