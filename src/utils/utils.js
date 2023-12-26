const _ = require("lodash");
const jwt = require("jsonwebtoken");

class UtilFunc {
  static getInfoData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields);
  };

  static updateObj(targetObj, newObj) {
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
      query.sort = "-created";
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

  static conditionQuery = (query) => {
    if (!query.sort) {
      query.sort = "-created";
    }

    if (!query.condition) {
      query.condition = {};
    } else {
      try {
        console.log(JSON.stringify(query.condition));
        query.condition = JSON.parse(JSON.stringify(query.condition));
      } catch (e) {
        console.log(`error::${e}`);
        query.condition = {};
      }
    }
    return query;
  };

  static generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  };

  static generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
  };

  static formatCustomDate(dateString) {
    const date = new Date(dateString);

    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  static formatCurrency(value) {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

}

module.exports = UtilFunc;
