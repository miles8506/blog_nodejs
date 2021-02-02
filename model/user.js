const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb://localhost/User', { useNewUrlParser: true, useUnifiedTopology: true });
const UserSchema = new Schema({
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdc_time: {
        type: String,
        default: Date.now
    },
    lastEdit_time: {
        type: String,
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
// const User = mongoose.model('User', UserSchema);
// User.deleteMany((err, res) => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(res);
// })

// User.findByIdAndUpdate(({
//     email: 'a123@gmail.com'
// }), ({
//     password: '123456'
// }), (err, data) => {
//     if (err) {
//         console.log(err.message);
//     }
//     console.log(data);
// })

