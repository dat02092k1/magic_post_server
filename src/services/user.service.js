const User = require('../models/user.model');
const { Api403Error, Api404Error } = require('../rest_core/error.response');
const UtilConstant = require('../utils/constants');
const UtilFunc = require('../utils/utils');
const bcrypt = require('bcrypt');

class UserService {
    static create = async (userDetails) => {
        const {username, password} = userDetails;

        const checkUser = await User.findOne({username: username});

        if (checkUser) throw new Api403Error('username already exists');

        const hashPassword = await bcrypt.hash(password, UtilConstant.SAL_ROUNDS);   
         
        const user = new User(userDetails);
        user.password = hashPassword;
        await user.save();
        return {
            user: UtilFunc.getInfoData({fields: ['_id', 'username'], object: user}),
        }
    }

    static getDetail = async (id) => {
        const holderUser = await User.findById(id);

        if (!holderUser) throw new Api404Error('user not found');

        return {
            user: UtilFunc.getInfoData({fields: ['_id', 'username'], object: holderUser}),
        }
    }

    static edit = async (id, user) => {
        const userData = await User.findById(id);
        if (!userData) throw new Api404Error('user not found');

        userData = user;
        
        await userData.save();
        console.log("edit success");
    }

    static delete = async (id) => {
        User.findByIdAndDelete(id, (e, deleted) => {
            if(e){
                console.log("ERROR: " + e);
            } else {
                console.log("deleted " + deleted);
            }
        })
        
    }

    static login = async (username, password) => {
        const user = await User.findOne({username: username});

        if(!user){
            return {
                result: 'no user'
            }
        }

        const pass = user.password;
        const hashPassword = await bcrypt.hash(password, UtilConstant.SAL_ROUNDS);   
        
        if(pass === hashPassword){
            return {
                result: 'success'
            }
        }

        return {
            result: 'failed'
        }
    }
}

module.exports = UserService;