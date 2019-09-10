const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const formidable = require('formidable');
const mv         = require('mv');
const fs         = require('fs');
const app        = express();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, './')));

app.post('/addItem', (req, res) => {
	const form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		const oldpath = files.filetoupload.path;
		const newpath = 'img/products/' + files.filetoupload.name;
		mv(oldpath, newpath, e => {
			fields.products[0] = '{';
	    fields.products[fields.products.length - 1] = '}'
	    fs.writeFile('items.json', fields.products, () => {
		    res.send();
	    });
		});
	});
});
app.post('/addorder', (req, res) => {
	fs.appendFile('orders.txt', JSON.stringify(req.body) + '\n', () => {
		res.send('Ваші дані прийнято. Дякуємо за покупку.');
	});
});
app.post('/callme', (req, res) => {
	fs.appendFile('callme.txt', JSON.stringify(req.body)+ '\n', () => {
		res.send('Ваші дані прийнято. Зачекайте трохи, ми з вами звяжемося.');
	});
});
app.post('/login', (req, res) => {
	if (req.body.login === '' && req.body.password === '') res.send('true');
	else res.send('false');
});
app.post('/delItem', (req, res) => {
	let products = JSON.stringify(req.body.products);
	products[0] = '{';
	products[products.length - 1] = '}'
	fs.writeFile('items.json', products, () => {
		res.send();
	});
});
app.post('/addOrd', (req, res) => {
	const datas = JSON.stringify(req.body);
	fs.appendFile('fastorders.txt', datas, () => {
		res.send();
	});
});

app.post('/delSomething', (req, res) => {
	const fileName = req.body.fileName;
	fs.writeFile(fileName, ' ', () => {
		res.send();
	});
});

app.listen(process.env.port || 3000, process.env.IP || '0.0.0.0');