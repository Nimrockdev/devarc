const express = require('express');

let app = express();

app.get('/dev', (req, res) => {
    res.json({
            ok: true,
            message: 'Hellow dev!'
        }

    )
});

module.exports = app;