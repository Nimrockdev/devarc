const config = require('../config/config');
let cloudinary = require('cloudinary').v2;

CLOUDINARY_URL = config.CD_CLOUDINARY_URL;
cloudinary.config({
    cloud_name: config.CD_CLOUD_NAME,
    api_key: config.CD_API_KEY,
    api_secret: config.CD_API_SECRET
});

let cloudinaryUpload = async(dir, name, type) => {

    let img = await cloudinary.uploader.upload(dir, { public_id: name, folder: `devarc/${type}`, use_filename: "true" })
        .then((img) => {
            console.log(`File ${name} uploaded to Cloudinary service`);
            return img;
        })
        .catch(
            (err) => { return err }
        );

    if (img !== null) { return img } else { return err };
}


module.exports = {
    cloudinaryUpload
}