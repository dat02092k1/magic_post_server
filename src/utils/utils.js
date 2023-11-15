const _ = require('lodash');

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
                query.condition = {};
            }
        }
        return query;
    }
}

module.exports = UtilFunc;