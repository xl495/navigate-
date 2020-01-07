module.exports = options => {
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../models/AdminUser')

    return async(req, res, next) => {
        assert(req.headers.authorization, 401, '需要登录!');
        const token = String(req.headers.authorization.split(' ').pop() || '');
        assert(token, 401, '需要登录!');
        const { id } = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '请先登录');
        req.user = AdminUser.findById(id);
        assert(req.user, 401, '请先登录');
        await next()
    }

}