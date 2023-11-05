const mongoose = require("mongoose");
const { db: {host, password}} = require('../configs/config.db');

const connectString = `mongodb+srv://${host}:${password}@cluster0.9i4qvbm.mongodb.net/`;

class Database {
    constructor() {
        this.connect()
    }

    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }                       

        mongoose.connect(connectString, {
            maxPoolSize: 50
        })
            .then((_) => console.log("DB connected"))
            .catch((err) => console.log('Error connect ' + err));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;