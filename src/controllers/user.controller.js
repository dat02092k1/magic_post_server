const { asyncHandler } = require("../middleware/auth");
const { CREATED, OK } = require("../rest_core/success.response");
const UserService = require("../services/user.service");

class UserController {
    create = asyncHandler(async (req, res, next) => {
        CREATED(res, 'create success', await UserService.create(req.body))
    })

    getDetail = asyncHandler(async (req, res, next) => {
        OK(res, 'get detail success', await UserService.getDetail(req.params.id))
    })
}

module.exports = new UserController();