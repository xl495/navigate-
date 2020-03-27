module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })


    router.post('/', async(req, res) => {
        // 创建资源
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    router.put('/:id', async(req, res) => {
        // 更新资源
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    router.delete('/:id', async(req, res) => {
        // 删除资源
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    router.get('/list', async(req, res) => {
        // 获取列表
        const data = await req.Model.find({}).limit(100);
        res.send({ data: data });
    })

    router.get('/:id', async(req, res) => {
        // 获取详情

        const data = await req.Model.findByid(req.params.id);
        res.send({ data: data });
    })


    const auth = require('../../middleware/auth'); // 登陆效验

    const resource = require('../../middleware/resource'); // 根据路由传参寻找对应 models

    app.use('/admin/api/rest/:resource', auth(), resource(), router);

    const multer = require('multer')

    const uploads = multer({ dest: __dirname + '/../../uploads' });



    app.use('/admin/api/upload', auth(), uploads.single('file'), async(req, res) => {
        const file = req.file;
        const url = `http://localhost:3000/uploads/${file.filename}`
        res.send({
            url
        })
    })

    //错误处理
    app.use(async(err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}