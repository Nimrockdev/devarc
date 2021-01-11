const express = require('express');
const fileUpload = require('express-fileupload');


const fs = require('fs');
const path = require('path');

const { cloudinaryUpload } = require('../controllers/cloudinary');

const app = express();

//let cloudinaryUpload = require('../controllers/cloudinary');

app.use(fileUpload());




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

        cloudinaryUpload(dir, name)
            .then(imagen => { console.log(imagen) })
            .then(() => {


                /*if (fs.existsSync(dir)) {
                    fs.unlinkSync(dir)
                }*/
            }).catch(err => console.log(err));


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