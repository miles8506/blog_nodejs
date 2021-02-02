var dateFormat = require("../node_modules/dateformat");
var now = new Date();
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb://localhost/User', { useNewUrlParser: true, useUnifiedTopology: true });
const ArticleSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    classes: {
        type: Number,
        require: true
    },
    nickname: {
        type: String,
        default: '',
    },
    created_time: {
        type: String,
        default: dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT")
    },
    views: {
        type: Number,
        default: 0
    }
});
module.exports = mongoose.model('Article', ArticleSchema);
// const article = mongoose.model('Article', ArticleSchema);
// var admin = new article({
//     title: 'hihi',
//     content: 'qq',
//     classes: 1
// })
// admin.save((err, data) => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(data);
// })
// article.findOne(({ title: 'hihi' }), (err, data) => {
//     console.log(data);
// })
// article.deleteMany((err, data) => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(data);
// })
