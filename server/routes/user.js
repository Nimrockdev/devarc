const express = require('express');
const User = require('../models/user');
const { checkToken, isAdmin } = require('../middlewares/authentication');

const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');

app.post('/user', function(req, res) {

    console.log(req.body);

    let body = req.body;
    let addressJSON = JSON.parse(req.body.address);
    let creditCardJSON = JSON.parse(req.body.creditCard);

    let user = new User({
        name: body.name,
        surnames: body.surnames,
        email: body.email,
        password: bcrypt.hashSync(body.password, 12),
        img: body.img,
        role: body.role,
        google: body.google,
        state: body.state,
        address: addressJSON,
        creditCard: creditCardJSON,
        mobilePhone: body.mobilePhone
    });

    console.log(user)

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(201).json({
            ok: true,
            usuario: userDB
        });
    });
});


app.put('/user/:id', checkToken, function(req, res) {

    let idUser = req.params.id;

    console.log(req.body)
    let body = _.pick(req.body, ['name', 'surnames', 'email', 'img', 'role', 'address', 'creditCard', 'mobilePhone']);

    User.findOneAndUpdate(idUser, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.status(201).json({
            ok: true,
            user: userDB
        });
    });

});


app.get('/users', checkToken, (req, res) => {
    let Users;
    User.find({})
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            };
            Users = users.length;
            res.status(200).json({
                ok: true,
                Users,
                users
            });
        })

});


module.exports = app;