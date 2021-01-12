const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const { cloudinaryUpload } = require('../controllers/cloudinary');

let Product = require('../models/product');

const app = express();

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

    if (type == 'users') {
        return res.status(400)
            .json({
                ok: false,
                error: { message: 'Upload users image, cooming soon' }
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

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

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



        cloudinaryUpload(dir, id, type)
            .then(imagen => {

                let img = {
                    type,
                    id,
                    url: imagen.url
                }


                //Delete File, extract from funcion
                if (fs.existsSync(dir)) {
                    fs.unlinkSync(dir)
                }
                //Update Product, extract funcion from here
                Product.updateOne({ _id: id }, { $set: { img: imagen.url } }, )
                    .then(product => console.log(`Product ${id} updated`))
                    .catch(err => console.log(error))


                return res.json({
                    ok: true,
                    product: id,
                    url: img.url
                });

            }).catch(err => {
                return res.json({
                    ok: false,
                    err
                });
            });

    });

});


module.exports = app;