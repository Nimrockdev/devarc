/* Require */
const express = require('express');

const app = express();

app.use(require('./routes/index'));

app.listen(3000, () => {
    console.log('LISTENING TO PORT', 3000);
})