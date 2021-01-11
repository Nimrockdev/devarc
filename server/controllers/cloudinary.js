let cloudinary = require('cloudinary').v2;

CLOUDINARY_URL = 'cloudinary: //341134228132323:aRPkk4oBFTrrjVZ0rrb3GLo8kzA@nimrockdevprojects';
cloudinary.config({
    cloud_name: 'nimrockdevprojects',
    api_key: '341134228132323',
    api_secret: 'aRPkk4oBFTrrjVZ0rrb3GLo8kzA'
});


let cloudinaryUpload = async(dir, name) => {

    let imagen = await cloudinary.uploader.upload(dir, { /*public_id: name,*/ folder: "devarc/products", use_filename: "true" })
        .then((image) => {
            console.log('File uploaded to Cloudinary service');
            //console.log(image);
            console.log('File uploaded to Cloudinary service');
            return image;

        })
        .catch(
            (err) => { return err }
        );

    if (imagen !== null) {
        return imagen
    } else { return err }
}







module.exports = {
    cloudinaryUpload
}



/*


        .then(
            function(image) {
                console.log('File uploaded to Cloudinary service');
                console.log(image);
                console.log('File uploaded to Cloudinary service');
                return image;

            })
        .catch(
            console.log(err)
        );
         }*/