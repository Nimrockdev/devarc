const express = require('express');

let app = express();

app.get('/dev', (req, res) => {
    let d = new Date();

    res.json({
        ok: true,
        message: `Hello dev! ${d.toTimeString()}`,
        urlDevarc: {
            postman: `https://documenter.getpostman.com/view/4424097/TVzVgaPa`,
            readme: `https://github.com/Nimrockdev/devarc/blob/master/README.md`,
            github: `https://github.com/Nimrockdev/devarc`
        }
    });

});

module.exports = app;