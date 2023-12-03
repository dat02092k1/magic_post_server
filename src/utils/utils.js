const _ = require('lodash');
const jwt = require('jsonwebtoken');

class UtilFunc {
    static getInfoData = ({fields = [], object = {}}) => {
        return _.pick(object, fields);
    }

    static updateObj (targetObj, newObj) {
        return _.extend(targetObj, newObj);
    }

    static getQuery(query) {
        if (!query.page) {
            query.page = 1;
        }
        if (!query.limit) {
            query.limit = 10;
        }
        if (!query.sort) {
            query.sort = '-created';
        }
        if (!query.condition) {
            query.condition = {};
        } else {
            try {
                query.condition = JSON.parse(query.condition);
            } catch (e) {
                console.log(`error::${e}`);
                query.condition = {};
            }
        }
        return query;
    }

    static generateAccessToken = (user) => {
        return jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'});
    }

    static generateRefreshToken = (user) => {
        return jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '5d'});
    }
}

module.exports = UtilFunc;