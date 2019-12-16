module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const router = express.Router({
        mergeParams: true
    })

    router.get('/', async(req, res) => {
        res.send({
            sesss: true
        })
    })

    app.use('/admin/api', router)
}