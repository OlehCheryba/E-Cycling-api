const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, './')));

app.post('/add-order', (req, res) => {
    const fs = require('fs');
    fs.appendFile('./orders.txt', JSON.stringify(req.body) + '\n', () => {
        res.send('good');
    })
})

app.post('/call-me', (req, res) => {
    const fs = require('fs');
    fs.appendFile('.call-me.txt', JSON.stringify(req.body) + '\n', () => {
    })
})

app.post('/login', (req, res) => {
    if (req.body.login == 'admin' && req.body.password == 'admin') {
        res.send(true)
    }
})
app.post('/addItem', (req, res) => {
    const fs = require('fs');
    let name = JSON.stringify(req.body.name)
    fs.appendFile('./items.html', `
<div class="section-our-products-product">
	<img src="img/bike-offroad.jpg" alt="Велосипед для бездоріжжя" class="section-our-products-image">
    <br>
    ${name.slice(1, name.length - 1)}
    <br>
    x$
	<img src="img/bookmark.png" alt="Закладка" class="section-our-products-bookmark">
    <a href="#" class="section-our-products-see-more">більше про товар</a>
</div>
    `, () => {
    })
})
app.listen(process.env.port || 3000, process.env.IP || '0.0.0.0');