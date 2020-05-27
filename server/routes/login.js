const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const config = require('../config/config');


const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'unknown user'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'invalid credentials test'
                }
            });

        }

        console.log(config.TOKEN_EXPIRATION);
        let token = jwt.sign({
            userDB
        }, config.dev, { expiresIn: config.TOKEN_EXPIRATION });
        console.log(token);

        res.json({
            oK: true,
            user: userDB,
            token
        })

    })

});






module.exports = app;