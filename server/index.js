const express = require('express');

const app = express();

app.use('/uploads', express.static('./uploads'))

const bodyParser = require('body-parser');

app.set('secret', 'ahsg#sj$s%')

app.use(require('cors')())

app.get('/', async(req, res) => {
    res.send('Hello');
})

app.use(bodyParser.json());

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