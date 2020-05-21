require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV || 'prod',
    port: process.env.PORT || 3000,
    urlDB: process.env.URL_DB || process.env.MONGO_URI,
    TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION || 3600
}

module.exports = config;