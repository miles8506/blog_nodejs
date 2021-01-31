const express = require('express')
const router = express.Router();
const fs = require('fs');
const path = require('path');
router.get('/', (req, res) => {
    fs.readFile(path.join(__dirname + '/views/index.html'), (err, data) => {
        if (err) {
            return res.status(500).end('Server error');
        };
        res.render('./index.html');
    });
});
module.exports = router;