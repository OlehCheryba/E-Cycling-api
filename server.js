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
        res.send('true')
    } else res.send('false')
})
app.post('/addItem', (req, res) => {
    const fs = require('fs');
    let name = JSON.stringify(req.body.name)
        , price = JSON.stringify(req.body.price);
    fs.appendFile('./items.html',
`<div class='section-our-products-product' name='${name.slice(1, name.length - 1)}'>
<img src='img/bike-offroad.jpg' alt='Велосипед' class='section-our-products-image' name='${name.slice(1, name.length - 1)}'>
<br>
${name.slice(1, name.length - 1)}
<br>
${price.slice(1, price.length - 1)}$
<img src='img/bookmark.png' alt='Закладка' class='section-our-products-bookmark'>
<a href='#' class='section-our-products-see-more'>більше про товар</a>
</div>`, () => {
    })
})
app.post('/saveItems', (req, res) => {
    const fs = require('fs');
    const htm = JSON.stringify(req.body.htm)
    fs.unlinkSync('./items.html')
    fs.appendFile('./items.html', htm.slice(1, htm.length - 1), () => {})
})
app.listen(process.env.port || 3000, process.env.IP || '0.0.0.0');