const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('./node_modules/express-session');
const router = require('./router');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('html', require('express-art-template'));
app.use('/public/', express.static(path.join(__dirname + '/public/')));
app.use('/node_modules/', express.static(path.join(__dirname + '/node_modules/')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(router);
app.use((err, req, res, next) => {
    res.status(500).json({
        status: 0,
        message: err.message
    });
})
app.listen(5400, () => {
    console.log('running')
});