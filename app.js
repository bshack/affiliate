const fs = require('fs');
const express = require('express');
const https = require('https');
const http = require('http');
const session = require('express-session');
const app = express();
const knex = require('knex');
const nodeJSX = require('node-jsx').install();

const routeIndex = require('./routes/index');
const routeCategory = require('./routes/category');
const routeProduct = require('./routes/product');

const ModelSite = require('./models/site');
const ModelCategory = require('./models/category');
const ModelProduct = require('./models/product');

app.use(session({
    secret: 'fiRfYZy8iCE2eKba8S6XFcZb',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));

app.use(express.static('assets'))

app.set('views', './views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine({}));

app.set('databaseConnection', knex({
    //debug: true,
    client: 'mysql',
    connection: {
        host : 'db-dev01.cxdjbgsmngcn.us-east-1.rds.amazonaws.com',
        user : 'admin',
        port: '3306',
        password : '85488FxQ76DNS608u3552Q6v3Bn8453P2TIRTJZxk',
        database : 'affiliates'
    }
}));

app.get('/', routeIndex.index);

app.get('/category/:categoryID', routeCategory.index);

app.get('/category/:categoryID/product/:productID', routeProduct.index);

https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}, app).listen(443, () => console.log('https server running on port 443'));
