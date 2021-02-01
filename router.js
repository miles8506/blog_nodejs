const express = require('express')
const router = express.Router();
const User = require('./model/user.js');
const md5 = require('blueimp-md5');
// 首頁
router.get('/', (req, res) => {
    res.render('./index.html', {
        user: req.session.login
    });
});

// 登入
router.get('/login', (req, res) => {
    res.render('./login.html');
});

router.post('/login', (req, res) => {
    const body = req.body;

    User.findOne(({
        email: body.email,
        password: md5(md5(body.password) + 'password')
    }), (err, data) => {
        if (err) {
            return res.status(500).json({
                status: 0,
                message: '伺服器忙線中'
            });
        };
        if (!data) {
            return res.status(200).json({
                status: 1,
                message: '登入失敗，請重新再試'
            });
        };
        req.session.login = data;
        return res.status(200).json({
            status: 2,
            message: '登入成功',
        });
    });
});

//登出 
router.get('/logout', (req, res) => {
    req.session.login = null;
    res.redirect('/');
})

// 註冊
router.get('/register', (req, res) => {
    res.render('./register.html');
});

router.post('/register', (req, res) => {
    const body = req.body;
    User.findOne({
        $or: [{
            email: body.email
        }, {
            nickname: body.nickname
        }]
    }, (err, data) => {
        if (err) {
            return res.status(500).json({
                status: 0,
                message: '伺服器忙線中'
            });
        };
        if (data) {
            return res.status(200).json({
                status: 1,
                message: '信箱或暱稱已被使用，請重新輸入'
            });
        };
        req.session.login = body;
        body.password = md5(md5(body.password) + 'password');
        new User(body).save((err, data) => {
            if (err) {
                return res.status(500).json({
                    status: 0,
                    message: '伺服器忙線中'
                });
            };
            res.status(200).json({
                status: 2,
                message: '保存成功'
            });
        });
    });
});

module.exports = router;