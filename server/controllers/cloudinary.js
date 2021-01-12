let cloudinary = require('cloudinary').v2;

CLOUDINARY_URL = 'cloudinary: //341134228132323:aRPkk4oBFTrrjVZ0rrb3GLo8kzA@nimrockdevprojects';
cloudinary.config({
    cloud_name: 'nimrockdevprojects',
    api_key: '341134228132323',
    api_secret: 'aRPkk4oBFTrrjVZ0rrb3GLo8kzA'
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