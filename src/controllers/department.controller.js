const { asyncHandler } = require("../middleware/auth");
const { CREATED, OK } = require("../rest_core/success.response");
const DepartmentService = require("../services/department.service");

class DepartmentController {
  create = asyncHandler(async (req, res, next) => {
    CREATED(res, "create success", await DepartmentService.create(req.body, req.file));
  });

  getDetail = asyncHandler(async (req, res, next) => {
    OK(
      res,
      "get detail success",
      await DepartmentService.getDetail(req.params.id)
    );
  });

  edit = asyncHandler(async (req, res, next) => {
    OK(
      res,
      "edit success",
      await DepartmentService.edit(req.params.id, req.body)
    );
  });

  delete = asyncHandler(async (req, res, next) => {
    OK(res, "delete success", await DepartmentService.delete(req.params.id));
  });

  getByCondition = asyncHandler(async (req, res, next) => {
    OK(res, "get the departments", await DepartmentService.get(req.query));
  });
}

module.exports = new DepartmentController();
