const User = require("../models/user.model");
const Department = require("../models/department.model");
const {Api403Error, Api404Error} = require("../rest_core/error.response");
const UtilConstant = require("../utils/constants");
const UtilFunc = require("../utils/utils");
const bcrypt = require("bcrypt");
const {cloudinary} = require("../helpers/cloudinary");

class UserService {
    static create = async (userDetails, file) => {
        const {email, password} = userDetails;

        const checkUser = await User.findOne({email: email}).lean();
        if (checkUser) throw new Api403Error("username already exists");

        const hashPassword = await bcrypt.hash(password, UtilConstant.SAL_ROUNDS);

        const user = new User(userDetails);
        user.password = hashPassword;

        if (file) {
            if (!file.mimetype.startsWith("image/"))
                throw new Api403Error("Only image files are allowed");

            await cloudinary.uploader.upload(
                file.path,
                {
                    folder: "File_img_CVHT_UET",
                },
                (error, result) => {
                    if (error) {
                        console.log("Error uploading image", error);
                        throw new Api404Error("Error uploading image");
                    } else {
                        console.log("Image uploaded successfully", result);
                        user.avatarUrl = result.secure_url;
                    }
                }
            );
        }

        await user.save();

        return {
            user: UtilFunc.getInfoData({
                fields: [
                    "_id",
                    "name",
                    "email",
                    "role",
                    "avatarUrl",
                    "phone",
                    "gender",
                ],
                object: user,
            }),
            token: UtilFunc.generateAccessToken(user),
        };
    };

    static getDetail = async (id) => {
        const holderUser = await User.findById(id).populate("departmentId").select('-password').lean();

        if (!holderUser) throw new Api404Error("user not found");

        return {
            user: holderUser,
        };
    };

    static edit = async (id, user, file) => {
        let userData = await User.findById(id);
        if (!userData) throw new Api404Error("user not found");

        userData = UtilFunc.updateObj(userData, user);

        if (file) {
            if (!file.mimetype.startsWith("image/"))
                throw new Api403Error("Only image files are allowed");

            await cloudinary.uploader.upload(
                file.path,
                {
                    folder: "File_img_CVHT_UET",
                },
                (error, result) => {
                    if (error) {
                        console.log("Error uploading image", error);
                        throw new Api404Error("Error uploading image");
                    } else {
                        console.log("Image uploaded successfully", result);
                        userData.avatarUrl = result.secure_url;
                    }
                }
            );
        }

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
        query = UtilFunc.getQuery(query);

        query.condition = JSON.parse(JSON.stringify(query.condition));
        const users = await User.find(JSON.parse(JSON.stringify(query.condition)))
            .populate("departmentId")
            .sort(query.sort);

        return {
            users: users.map((user) =>
                UtilFunc.getInfoData({
                    fields: [
                        "_id",
                        "name",
                        "email",
                        "role",
                        "phone",
                        "gender",
                        "departmentId",
                    ],
                    object: user,
                })
            ),
            numbers: await User.countDocuments(query.condition),
        };
    };

    static deleteUsersByCondition = async (condition) => {
        console.log(condition);
        if (!condition || typeof condition !== "object")
            throw new Api403Error("Invalid condition provided");

        const targetUsers = await User.deleteMany(condition);

        if (!targetUsers) throw new Api404Error("delete failed");

        return {
            user: targetUsers,
        };
    };

    static importUsers = async (data) => {
        const emailSet = new Set();

        for (const row of data) {
            if (emailSet.has(row.email)) {
                throw new Api404Error(`Duplicate email: ${row.email}`);
            }
            emailSet.add(row.email);
        }

        const existingUsers = await Promise.all([
            User.find({email: {$in: Array.from(emailSet)}}, {email: 1}),
        ]);

        const duplicateEmails = data.filter(item => existingUsers[0].some(user => user.email === item.email));

        if (duplicateEmails.length > 0) {
            const errors = {
                duplicateEmails,
            };
            console.log(errors);
            throw new Api404Error(`Duplicate ${errors}`);
        }

        for (const row of data) {
            const checkDep = await Department.findById(row.departmentId);
            if (!checkDep) throw new Api404Error("department not found");
        }

        const newUsers = [];

        for (const row of data) {
            const password = row.password;
            const hashPassword = await bcrypt.hash(password, UtilConstant.SAL_ROUNDS);
            row.password = hashPassword;
            newUsers.push(row);
        }

        await Promise.all([
            User.insertMany(newUsers),
        ]);

        // for (let i = 0; i < data.length; i++) {
        //   const user = users[i];
        //   const { email, password } = user;
        //   const checkUser = await User.findOne({ email: email }).lean();
        //   if (checkUser) throw new Api403Error("username already exists");
        //   const hashPassword = await bcrypt.hash(password, UtilConstant.SAL_ROUNDS);
        //   user.password = hashPassword;
        //   newUsers.push(user);
        // }
        return {
            metadata: 'success'
        };
    }
}

module.exports = UserService;