const jwt = require('jsonwebtoken');
const config = require('../config/config');

let checkToken = (req, res, next) => {

    let token = req.get('token');
    jwt.verify(token, config.dev, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: { message: 'Invalid token' }
            });
        }

        req.usuario = decoded.user;
        next();

    })
};




module.exports = {
    checkToken
}