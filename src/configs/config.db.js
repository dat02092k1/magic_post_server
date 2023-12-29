'use strict';
require('dotenv').config()

const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 3052
    },
    db: {
        host: process.env.DEV_DB_HOST || '127.0.0.1',
        port: process.env.DEV_DB_PORT || 27017,
        name: process.env.DEV_DB_NAME || 'Magic_post'
    }
}

const cloud = {
    app: {
        port: process.env.PRO_APP_PORT || 3000
    },
    db: {
        host: process.env.CLOUD_DB_HOST || 'localhost',
        password: process.env.CLOUD_DB_PW || 'magic_post',
    }
}

const config = {dev, cloud}
const env = 'cloud';
module.exports = config['cloud'].db;