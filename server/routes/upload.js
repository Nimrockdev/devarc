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
                    message: 'No se ha seleccionado níngun archivo'
                }
            });
    } else {
        console.log('hay fichero')
    }

    let img = {
        type,
        id
    }

    return res.json({
        ok: false,
        im: img,
        err: { message: 'esto es un test' }
    });

});


module.exports = app;