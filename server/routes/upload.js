const express = require('express');
const fileUpload = require('express-fileupload');


const fs = require('fs');
const path = require('path');

const app = express();
app.use(fileUpload());


let cloudinary = require('cloudinary').v2;

app.put('/upload/:type/:id', (req, res) => {

    let type = req.params.type;
    let id = req.params.id;

    if (Object.keys(req.files).length == 0) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'File not found'
                }
            });
    }

    let imageType = ['products', 'users'];

    if (imageType.indexOf(type) < 0) {
        return res.status(400)
            .json({
                ok: false,
                error: { message: 'The types valids are ' + imageType.join(', ') }
            })
    }

    let validExtensions = ['jpg', 'png', 'jpeg', 'bmp', 'gif'];
    let file = req.files.img;
    let name = file.name.split('.');

    extension = name[name.length - 1];

    if (validExtensions.indexOf(extension) < 0) {
        return res.status(400)
            .json({
                ok: false,
                error: { message: 'The extensions valids are ' + validExtensions.join(', ') }
            })
    }


    name = id + '.' + extension;
    file.name = name;


    console.log(file)
    CLOUDINARY_URL = 'cloudinary: //341134228132323:aRPkk4oBFTrrjVZ0rrb3GLo8kzA@nimrockdevprojects';
    cloudinary.config({
        cloud_name: 'nimrockdevprojects',
        api_key: '341134228132323',
        api_secret: 'aRPkk4oBFTrrjVZ0rrb3GLo8kzA'
    });
    /*console.log(req.files.img)
    /*cloudinary.uploader.upload('', function(error, result) { console.log(result, error) });
    */
    let dir = `uploads/${type}/${name}`;
    file.mv(dir, (err) => {
        //archivo.mv('uploads/filename.jpg', (err) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        //Imagen cargada
        /*
        if (tipo === 'usuarios') {
            imagenUsuario(id, res, nombreArchivo);
        } else {
            imagenProducto(id, res, nombreArchivo);
        }
        */
        /*use_filename: 'true'
        options = { folder: 'devarc/products' }
        */
        cloudinary.uploader.upload(dir, { public_id: name, folder: "devarc/products", use_filename: "true" })
            .then(
                function(image) {
                    console.log('** file uploaded to Cloudinary service');
                    console.dir(image);
                    //photo.image = image;
                    // Save photo with image metadata
                    // return photo.save();

                })
            .then(function() {
                console.log('** photo saved');


                //let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ nombreImagen }`)

                if (fs.existsSync(dir)) {
                    console.log('170');
                    fs.unlinkSync(dir)
                    console.log('172');

                }

            })





    });

    let img = {
        type,
        id,
        file: req.files
    }

    //console.log(img);

    return res.json({
        ok: false
            //img: img
    });

});


module.exports = app;