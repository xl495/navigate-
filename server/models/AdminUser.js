const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    username: String,
    nickName: {
        type: String,
        default: '昵称'
    },
    password: {
        type: String,
        select: false,
        set(val) {
            return require('bcryptjs').hashSync(val, 10)
        }
    },
    roles: {
        type: String,
        default: 'user'
    }
});
module.exports = mongoose.model('AdminUser', schema);