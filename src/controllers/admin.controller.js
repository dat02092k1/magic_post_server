const { asyncHandler } = require("../middleware/auth");
const { CREATED, OK } = require("../rest_core/success.response");
const UserService = require("../services/user.service");

class AdminController {
  deleteUsersByCondition = asyncHandler(async (req, res, next) => {
    OK(res, "delete success", await UserService.deleteUsersByCondition(req.body.condition));
  });
}

module.exports = new AdminController();