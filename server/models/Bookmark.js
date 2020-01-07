const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    title: {
        type: String,
        default: '默认书签名称'
    },
    image: {
        type: String,
        default: ''
    }
});
module.exports = mongoose.model('Bookmark', schema);