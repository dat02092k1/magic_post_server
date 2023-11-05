const _ = require('lodash');

class UtilFunc {
    static getInfoData = ({fields = [], object = {}}) => {
        return _.pick(object, fields);
    }
}

module.exports = UtilFunc;