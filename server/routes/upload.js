const express = require('express');
const fileUpload = require('express-fileupload');


const fs = require('fs');
const path = require('path');

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






    let img = {
        type,
        id,
        file: req.files
    }

    return res.json({
        ok: false
            //im: img
    });

});


module.exports = app;