module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')
    const router = express.Router({
        mergeParams: true
    })

    router.post('/registered', async(req, res) => { //注册 
        const { username, password } = req.body;
        const name = await AdminUser.find({ username });
        if (name.length == 0) {
            const newUser = await AdminUser.insertMany(req.body);
            return res.send({
                newUser,
                msg: '注册成功!'
            })
        }
        res.status(401).send({
            msg: '已存在用户!'
        })
    })

    router.post('/login', async(req, res) => { // 登陆
        const { username, password } = req.body;
        const user = await AdminUser.findOne({ username }).select('+password');
        assert(user, 422, { 'message': '用户不存在' })
        const isValid = require('bcryptjs').compareSync(password, user.password)
        assert(isValid, 422, { 'message': '密码错误' })
        res.send({ isValid: isValid })
    })

    router.get('/', async(req, res) => {
        res.send({
            sesss: true
        })
    })

    app.use('/admin/user', router);
    app.use(async(err, req, res, next) => {
        // console.log(err)
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}