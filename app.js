const fs = require('fs');
const express = require('express');
const https = require('https');
const http = require('http');
const session = require('express-session');
const app = express();

app.use(session({
    secret: 'fiRfYZy8iCE2eKba8S6XFcZb',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}))

const routeHome = require('./routes/home');
const routeCategory = require('./routes/category');
const routeProduct = require('./routes/product');
const routeContent = require('./routes/content');

app.get('/', routeHome.route);

app.get('/category/:categoryID', routeCategory.route);

app.get('/category/:categoryID/product/:productID', routeProduct.route);

app.get('/category/:categoryID/content/:contentID', routeContent.route);

https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}, app).listen(3000, () => console.log('Example app listening on port 3000!'));
