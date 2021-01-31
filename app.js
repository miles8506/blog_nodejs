const express = require('express');
const app = express();
const path = require('path');
const router = require('./router');
app.engine('html', require('express-art-template'));
app.use('/public/', express.static(path.join(__dirname + '/public/')));
app.use('/node_modules/', express.static(path.join(__dirname + '/node_modules/')));
app.use(router);
app.listen(3000, () => {
    console.log('running')
});