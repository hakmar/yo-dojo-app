var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'src')));

app.get('/products', function (req, res) {
	res.json([
		{id: 1, name: 'Milk', quantity: 10, price: '2.49', selected: false},
		{id: 2, name: 'Eggs', quantity: 5, price: '1.69', selected: false},
		{id: 3, name: 'Apples', quantity: 36, price: '0.69', selected: false}
	]);
});

app.get('/noproducts', function (req, res) {
	res.json([]);
});

app.listen(process.env.PORT || 8082);
