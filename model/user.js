const mongoose = require('mongoose'); //
const { Schema } = mongoose;  // 
mongoose.connect('mongodb://localhost/User', { useNewUrlParser: true, useUnifiedTopology: true });
const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/public/img/avatar-default.png'
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    birthday: {
        type: Date
    },
    status: {
        type: Number,
        enum: [0, 1, 2],
        default: 0
    }
});
module.exports = mongoose.model('User', UserSchema);
// var admin = new User({
//     email: 'a123@gmail.com',
//     nickname: 'miles',
//     password: 'a123456'
// });
// admin.save((err, data) => {
//     if (err) {
//         return console.log('err');
//     }
//     console.log(data);
//     console.log('成功');
// })
// User.findOne(({ email: 'a123@gmail.com' }), (err, data) => {
//     if (err) {
//         return console.log('err');
//     }
//     console.log(data);
// })

// User.deleteMany((err, data) => {
//     if (err) {
//         return console.log('err');
//     };
//     console.log('成功');
// })
