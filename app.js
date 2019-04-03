const envConfig = require('./env.json');
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

app.use(session({
    secret: envConfig.session.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));

app.use(express.static('dist'))

app.set('views', './views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine({
    transformViews: false
}));

app.set('databaseConnection', knex({
    client: 'mysql',
    connection: envConfig.database.connection
}));

app.get('/', routeIndex.index);

app.get('/**/index.html', routeCategory.index);

app.get('/**/*.html', routeProduct.index);

https.createServer({
    key: fs.readFileSync(envConfig.ssl.key),
    cert: fs.readFileSync(envConfig.ssl.cert)
}, app).listen(envConfig.ssl.port, () => console.log('https server running on port ' + envConfig.ssl.port)).on('error', console.log);
