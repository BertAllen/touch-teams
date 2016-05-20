var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var api = require('./server-assets/api/api');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public'));
app.use('/', api.router);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080);
console.log("listening on http://localhost:8080/");