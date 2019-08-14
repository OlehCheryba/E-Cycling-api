const assert      = require('assert');
const express     = require('express');
const bodyParser  = require('body-parser');
const path        = require('path');
const http        = require('http');
const MongoClient = require('mongodb').MongoClient;
const format      = require('util').format;
const app         = express();

const url = 'mongodb://localhost:27017/site-datas';
const monClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

monClient.connect((err, db) => {
	if (err) return console.log('fail');
	console.log('all is good');



    db.close();
});

/* 
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
 
mMongoClient.connect((err, client) => {
    const db = client.db("usersdb");
    const collection = db.collection("users");
    let user = {name: "Tom", age: 23};
    if (err) return console.log('fail');
    console.log('all is good');

    client.close();
});
*/


app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, './')));

app.post('/add-order', (req, res) => {
    const fs = require('fs');
    fs.appendFile('./orders.txt', JSON.stringify(req.body) + '\n', () => {
        res.send('Ваші дані прийнято. Дякуємо за покупку.');
    });
});
app.post('/call-me', (req, res) => {
    const fs = require('fs');
    fs.appendFile('.call-me.txt', JSON.stringify(req.body.number) + '\n', () => {
        res.send('Ваші дані прийнято. Зачекайте трохи, ми з вами звяжемося.');
    })
});
app.post('/login', (req, res) => {
    if (req.body.login == 'admin' && req.body.password == 'admin') {
        res.send('true');
    } else res.send('false');
});
app.post('/addItem', (req, res) => {
    const fs = require('fs');
    const html = JSON.stringify(req.body.html);
    fs.appendFile('./items.html', html.slice(1, html.length - 1), () => {
        res.send('true');
    });
});
app.post('/saveItems', (req, res) => {
    const fs = require('fs');
    const html = JSON.stringify(req.body.html);
    fs.unlinkSync('./items.html');
    fs.appendFile('./items.html', html.slice(1, html.length - 1), () => {
        res.send('true');
    });
});
app.listen(process.env.port || 80, process.env.IP || '10.156.0.3');
