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
    // console.log('credit card');

    // console.log(creditCardJSON)
    // console.log(creditCardJSON.name);
    // console.log(creditCardJSON.number);

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
        mobilePhone : body.mobilePhone
    });

console.log(user)

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


app.put('/user/:id', checkToken, function(req, res) {

    let idUser = req.params.id;

    console.log(req.body)
    let body = _.pick(req.body, ['name', 'surnames', 'email', 'img', 'role', 'address','creditCard','mobilePhone']);

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

    // res.json({
    //             ok: true,
    //             user: body
    //         });

});


app.get('/users', checkToken, (req, res) => {
    let Users;
    User.find({})
        .exec((err, users) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            };
            Users = users.length;
            res.json({
                ok: true,
                Users,
                users
            });
        })

});


module.exports = app;