const express = require('express');
const User = require('../models/user');
const { checkToken } = require('../middlewares/authentication');

const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');

app.post('/user', function(req, res) {

    console.log(req.body);

    let body = req.body;
    let addressJSON = JSON.parse(req.body.address);
    console.log('adress');

    console.log(addressJSON)
    console.log(addressJSON.city);

    let user = new User({
        name: body.name,
        surnames: body.surnames,
        email: body.email,
        password: bcrypt.hashSync(body.password, 12),
        img: body.img,
        role: body.role,
        google: body.google,
        state: body.state,
        address: addressJSON
    });

    console.log('User:');
    console.log(user);
    // return res.status(200).json({
    //     ok: true,
    //     user
    // });

    user.save((err, userDB) => {
        if (err) {
            //si llega al retorn sale
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: userDB
        });
    });
});


app.put('/user/:id', /*, checkToken, */ function(req, res) {

    let idUser = req.params.id;
    let body = _.pick(req.body, ['name', 'surnames', 'email', 'img', 'role', 'address']);

    // useFindAndModify
    // findOneAndUpdate
    User.findOneAndUpdate(idUser, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            user: userDB
        });
    });

});



app.get('/users', checkToken, (req, res) => {

    User.find({})
        .exec((err, users) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            };
            res.json({
                ok: true,
                users
            });
        })

});


module.exports = app;