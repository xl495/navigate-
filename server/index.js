const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.get('/', async(req, res) => {
    res.send('Hello');
})

app.use(bodyParser.urlencoded({
    extended: true
}));

require("./plugins/db")(app)
require("./router/admin/index")(app)
require("./router/admin/user")(app)
require("./router/web/index")(app)

app.listen(3000, () => {
    console.log('http://localhost:3000')
})