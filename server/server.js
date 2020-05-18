/* Require */
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');


const app = express();
/*revisar*/
// app.use(express.json());

app.use(require('./routes/index'));

// mongoose.connect(config.urlDB,  (err, res) => {
//     if (err) throw err;
//     console.log('BD Mongo Connected');

// });

mongoose
    .connect(
        config.urlDB, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    ).then(() => console.log(`URL DB: ${config.urlDB}`))
    .catch(err => console.log(err.message));


app.listen(config.port, () => {

    console.log(`API Server Listening on http://localhost:${config.port}`);
    console.log(`Environment: ${config.dev}`);

});