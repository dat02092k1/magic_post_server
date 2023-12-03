const { asyncHandler } = require("../middleware/auth");
const { CREATED, OK } = require("../rest_core/success.response");
const UserService = require("../services/user.service");

class UserController {
  create = asyncHandler(async (req, res, next) => {
    CREATED(res, "create success", await UserService.create(req.body));
  });

  getDetail = asyncHandler(async (req, res, next) => {
    OK(res, "get detail success", await UserService.getDetail(req.params.id));
  });

  editDetail = asyncHandler(async (req, res, next) => {
    OK(
      res,
      "edit detail success",
      await UserService.edit(req.params.id, req.body)
    );
  });

  delete = asyncHandler(async (req, res, next) => {
    OK(res, "delete user success", await UserService.delete(req.params.id));
  });

  getByCondition = asyncHandler(async (req, res, next) => {
    OK(res, "get success", await UserService.getByCondition(req.query));
  });
}

module.exports = new UserController();
