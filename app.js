const fs = require('fs');
const express = require('express');
const https = require('https');
const http = require('http');
const session = require('express-session');
const app = express();
require('node-jsx').install();

app.use(session({
    secret: 'fiRfYZy8iCE2eKba8S6XFcZb',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));

app.set('views', './views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine({}));

const routeIndex = require('./routes/index');
const routeCategory = require('./routes/category');
const routeProduct = require('./routes/product');
const routeContent = require('./routes/content');


app.get('/', routeIndex.index);

app.get('/category/:categoryID', routeCategory.category);

app.get('/category/:categoryID/product/:productID', routeProduct.product);

app.get('/category/:categoryID/content/:contentID', routeContent.content);

https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}, app).listen(3000, () => console.log('Example app listening on port 3000!'));
