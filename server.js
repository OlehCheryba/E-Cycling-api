const express     = require('express');
const bodyParser  = require('body-parser');
const path        = require('path');
const http        = require('http');
var formidable    = require('formidable');
const app         = express();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, './')));

app.post('/fileupload', (req, res) => {
	const fs = require('fs');
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
    	try {
	    	var oldpath = files.filetoupload.path;
	    	var newpath = 'img/' + files.filetoupload.name;
	    	fs.rename(oldpath, newpath, function (err) {
	        	res.send('ok');
	        });
    	} catch (e){
    		fs.rename('bike-offroad.jpg', 'bike-offroad.jpg', err => {});
    		res.send('ok');
    	}
    });
});
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
    });
});
app.post('/login', (req, res) => {
    if (req.body.login == 'admin' && req.body.password == 'admin') res.send('true'); 
    else res.send('false');
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
