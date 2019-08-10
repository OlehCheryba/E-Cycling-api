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
    let a= 'good'
    const fs = require('fs');
    fs.appendFile('.call-me.txt', JSON.stringify(req.body) + '\n', () => {
    })
    if (req.body.number == 'bad') {
        a = true;
        res.send(a)
    }
    //res.send(a);
})

app.post('/login', (req, res) => {
    let a= 'good'
    const fs = require('fs');
    fs.appendFile('.call-me.txt', JSON.stringify(req.body) + '\n', () => {
    })
    if (req.body.login == 'admin' && req.body.password == 'admin') {
        a = true;
        res.send(a)
    }
    //res.send(a);
})


app.listen(process.env.port || 3000, process.env.IP || '0.0.0.0');