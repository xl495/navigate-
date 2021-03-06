const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    title: {
        type: String,
        default: '默认昵称'
    },
    url: {
        type: String,
        default: 'https://images.unsplash.com/photo-1481285184914-8a731806bbf8?ixlib=rb-0.3.5&q=99&fm=jpg&crop=entropy&cs=tinysrgb&w=2048&fit=max&s=c9887d024a96398a1f2ab6c36162120c'
    },
    like: {
        type: Number,
    },
    isToday: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Cover', schema);