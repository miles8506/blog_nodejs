const express = require('express');
const router = express.Router();
const User = require('./model/user.js');
const Article = require('./model/article.js');
const md5 = require('./node_modules/md5');
const { findByIdAndUpdate } = require('./model/user.js');
//首頁
router.get('/', (req, res, next) => {
    const body = req.session.body;
    Article.find((err, data) => {
        if (err) {
            return next(err);
        }
        res.render('./index.html', {
            user: body,
            article: data
        });
    });
});
//登入
router.get('/login', (req, res) => {
    res.render('./login.html');
});

router.post('/login', (req, res, next) => {
    const body = req.body;
    User.findOne(({
        email: body.email,
        password: md5(md5(body.password))
    }), (err, data) => {
        if (err) {
            return next(err);
        };
        if (!data) {
            return res.status(200).json({
                status: 4,
                message: `帳號密碼輸入有誤請查驗後再重新登入`
            });
        };
        req.session.body = data;
        return res.status(200).json({
            status: 3,
            message: `登入成功`
        });
    });
});

//登出
router.get('/logout', (req, res) => {
    req.session.body = null;
    res.redirect('/');
});

//註冊
router.get('/register', (req, res) => {
    res.render('./register.html');
});

router.post('/register', (req, res, next) => {
    const body = req.body;
    User.findOne({
        $or: [{
            email: body.email
        }, {
            nickname: body.nickname
        }]
    }, (err, data) => {
        if (err) {
            return next(err);
        };
        if (data) {
            return res.status(200).json({
                status: 1,
                message: `信箱或暱稱已被使用，請重新輸入，謝謝！`
            });
        };
        body.password = md5(md5(body.password));
        req.session.body = body;
        new User(body).save((err, data) => {
            if (err) {
                return next(err);
            };
            return res.status(200).json({
                status: 3,
                message: `註冊成功`
            });
        });
    });
});
// 帳號設置
router.get('/admin', (req, res) => {
    const body = req.session.body;
    res.render('./settings/admin.html', {
        user: body
    });
});

router.post('/admin', (req, res, next) => {
    const body = req.body;
    const sessionbody = req.session.body;
    if (body.newpassword !== body.checkpassword || body.password === body.newpassword || body.password === body.checkpassword) {
        return res.status(200).json({
            status: 5,
            message: `請重新確認修改密碼`
        });
    };
    User.findByIdAndUpdate(sessionbody._id, ({
        password: md5(md5(body.checkpassword))
    }), (err, data) => {
        if (err) {
            return next(err);
        };
        return res.status(200).json({
            status: 3,
            message: `修改密碼成功`
        });
    });
});

//基本訊息
router.get('/profile', (req, res) => {
    const body = req.session.body;
    res.render('./settings/profile.html', {
        user: body
    });
});

router.post('/profile', (req, res, next) => {
    const body = req.body;
    console.log(body);
    const sessionbody = req.session.body;
    User.findByIdAndUpdate(sessionbody._id, ({
        email: body.email,
        nickname: body.nickname,
        bio: body.bio,
        gender: body.gender,
        birthday: body.birthday,
        lastEdit_time: Date.now()
    }), (err, data) => {
        if (err) {
            return next(err);
        };
        return res.status(200).json({
            status: 3,
            message: `修改成功`
        });
    });
});

//發表文章
router.get('/topics/new', (req, res) => {
    const body = req.session.body;
    res.render('./topic/new.html', {
        user: body
    });
});

router.post('/topics/new', (req, res, next) => {
    const body = req.body;
    body.nickname = req.session.body.nickname;
    console.log(body.nickname);
    if (body.classes == '' || body.title == '' || body.content == '') {
        return res.status(200).json({
            status: 5,
            message: `請重新確認發文內容是否有遺漏部分`
        });
    };
    new Article(body).save((err, data) => {
        if (err) {
            return next(err);
        }
        return res.status(200).json({
            status: 3,
            message: `發文成功`
        });
    });
});

// 文章內頁
router.get('/topics/show', (req, res, next) => {
    const body = req.session.body;
    let url = req.query.id;
    url = url.replace(/"/g, '');
    Article.findOne(({ _id: url }), (err, data) => {
        if (err) {
            return next(err);
        };
        res.render('./topic/show.html', {
            user: body,
            article: data
        });
    });
});

module.exports = router;