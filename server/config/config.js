//require('dotenv').config();
require('dotenv').config({ silent: process.env.NODE_ENV === 'prod' });

const config = {
    dev: process.env.NODE_ENV || 'prod',
    port: process.env.PORT || 3000,
    urlDB: process.env.URL_DB || process.env.MONGO_URI,
    TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION || 3600000,
    CD_CLOUDINARY_URL: process.env.CD_CLOUDINARY_URL,
    CD_CLOUD_NAME: process.env.CD_CLOUD_NAME,
    CD_API_KEY: process.env.CD_API_KEY,
    CD_API_SECRET: process.env.CD_API_SECRET
}

module.exports = config;