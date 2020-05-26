var express = require("express");
var app = express();
var expressLayouts = require('express-ejs-layouts');
var path = require("path");

global.__base = __dirname;
global.__path_app = __base + '/app';
global.__path_routes = __path_app + '/routes';
global.__path_views = __path_app + '/views';


var port = process.env.PORT || '3000';
app.listen(port);

console.log("Server running at Port 3000");

// app.use('/static', express.static('public'))

app.use(express.static(path.join(__dirname, 'public')));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', __path_views + '/index');

app.use('/', require(__path_routes + '/index'));

module.exports = app;