const jwt = require("jsonwebtoken");
const {Api403Error, Api404Error, Api401Error} = require("../rest_core/error.response");
const {asyncHandler} = require("./auth");
const UtilConstant = require("../utils/constants");
require('dotenv').config();

class verifyMiddileware {
    verifyToken = (req, res, next) => {
        const token = req.headers[UtilConstant.HEADER.AUTHORIZATION];
        if (token) {
            console.log(token);
            const accessToken = token.split(" ")[1];
            console.log(accessToken);
            jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    console.log(err);
                    throw new Api403Error("Forbidden request");
                }
                req.user = user;
                next();
            });
        } else {
            throw new Api401Error("You're not authenticated");
        }
    }

    isAdmin = asyncHandler(async (req, res, next) => {
        this.verifyToken(req, res, () => {
            if (req.user.role !== UtilConstant.roleUsers['admin']) throw new Api403Error('Only admin can do this');
            next();
        })
    })

    isHeadGathering = asyncHandler(async (req, res, next) => {
        this.verifyToken(req, res, () => {
            if (req.user.role !== UtilConstant.roleUsers['headGathering'] || req.user.role !== utilContainers.roleUsers["admin"]) throw new Api403Error('Only headGathering can do this');
            next();
        })
    })

    isHeadTransaction = asyncHandler(async (req, res, next) => {
        this.verifyToken(req, res, () => {
            if (req.user.role !== UtilConstant.roleUsers['headTransaction'] || req.user.role !== utilContainers.roleUsers["admin"]) throw new Api403Error('Only headTransaction can do this');
            next();
        })
    })
}


module.exports = new verifyMiddileware();