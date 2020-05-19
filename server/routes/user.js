const express = require('express');
const Usuario = require('../models/user');

const app = express();


app.post('/user', function(req, res) {

    console.log('entramos en post');
    console.log(req.body);

    let body = req.body;
    console.log(body.name);
    let usuario = new Usuario({
        name: body.name,
        email: body.email,
        //password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });


    return res.status(200).json({
        ok: true,
        body
    });

    // usuario.save((err, usuarioDB) => {
    //     if (err) {
    //         //si llega al retorn sale
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }
    //     //usuarioDB.password = null;
    //     res.json({
    //         ok: true,
    //         usuario: usuarioDB
    //     });
    // });
});

module.exports = app;