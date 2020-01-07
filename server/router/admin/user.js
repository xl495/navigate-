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
        assert(username, 422, '请输入账号!');
        assert(password, 422, '请输入密码!');
        const name = await AdminUser.find({ username });
        if (name.length == 0) {
            const newUser = await AdminUser.insertMany(req.body);
            return res.send({
                newUser,
                message: '注册成功!'
            })
        }
        res.status(422).send({
            message: '已存在用户!'
        })
    })

    router.post('/login', async(req, res) => {
        const { username, password } = req.body;
        assert(username, 422, '请输入账号!');
        assert(password, 422, '请输入密码!');
        const user = await AdminUser.findOne({ username }).select('+password');
        assert(user, 422, '用户不存在');
        const isValid = require('bcryptjs').compareSync(password, user.password)
        assert(isValid, 422, '密码错误');
        const token = jwt.sign({ id: user._id }, app.get('secret'));
        res.send({ token, name: user.nickName })
    })

    const auth = require('../../middleware/auth');
    router.get('/', auth(), async(req, res) => {
        const data = await AdminUser.find()
        res.send(data)
    })

    router.put('/:id', auth(), async(req, res) => {
        const data = await AdminUser.findByIdAndUpdate(req.params.id, req.body);
        res.send(data)
    })

    router.delete('/:id', auth(), async(req, res) => {
        const data = await AdminUser.findByIdAndDelete(req.params.id)
        res.send(data)
    })

    app.use('/admin/api/user', router);
    //错误处理
    app.use(async(err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}