require('dotenv').config();
// require('dotenv').config({path:'./server/.env'}); //debugging
const express = require('express');
const { port, dbConnection } = require('./config/config');
const db = require('./config/db');
const path = require('path');

const app = express();
db(dbConnection).then(() => {
    require('./config/express')(app, express);
    require('./routes/router')(app);

    app.get('/*', (req, res, next) => res.sendFile(path.join(__dirname, '/static/index.html')));

    console.log('*** >>> Data base is connect <<< ***');
    app.listen(port, () => console.log(`Server is listening on port: ${port} -> http://localhost:${port}/`));
}).catch((err) => console.log('!!!--- > Data base is not connect < --- !!!', err));
