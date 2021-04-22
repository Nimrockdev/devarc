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

let isAdmin = (req, res, next) => {
    let user = req.body;
    if (user.role === 'ADMIN_ROLE') {
        console.log('is admin');
        next();
    } else {
        console.log('not is admin');
        res.json({
            ok: false,
            err: { message: 'The user is not an administrator' }
        })
    }

};


module.exports = {
    checkToken,
    isAdmin
}