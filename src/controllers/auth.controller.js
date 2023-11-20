const { asyncHandler } = require("../middleware/auth");
const { CREATED, OK } = require("../rest_core/success.response");
const UserService = require("../services/user.service");
const AuthService = require("../services/auth.service");

class AuthController {
    login = asyncHandler(async (req, res, next) => {
        OK(res, 'signin success', await AuthService.login(req.body));
    })

    forgetPassword = asyncHandler(async (req, res, next) => {
        OK(res, 'send verification code', await AuthService.forgetPassword(req.body))
    })

    resetPassword = asyncHandler(async (req, res, next) => {
        OK(res, 'reset password success', await AuthService.checkVerifyCode(req.body))
    })
}

module.exports = new AuthController();