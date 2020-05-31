var express = require("express");
var app = express();
var expressLayouts = require('express-ejs-layouts');
var path = require("path");
const session = require('express-session');
var bodyParser = require('body-parser');

global.__base = __dirname;
global.__path_app = __base + '/app';
global.__path_public = __base + '/public';
global.__path_config = __path_app + '/config';
global.__path_routes = __path_app + '/routes';
global.__path_views = __path_app + '/views';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var port = process.env.PORT || '3000';
app.listen(port);

console.log("Server running at Port " + port);

app.use(session({
    secret: 'hatomia',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 15 * 60 * 1000
    }
}));

app.use(express.static(path.join(__path_public)));

app.set('views', path.join(__path_views));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', __path_views + '/index');

app.use('/', require(__path_routes + '/index'));


module.exports = app;