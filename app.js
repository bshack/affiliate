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
const routePLP = require('./routes/plp');
const routePDP = require('./routes/pdp');
const routeContent = require('./routes/content');

app.use(session({
    secret: envConfig.session.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));

app.use(express.static('dist'))

app.set('views', './layouts');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine({
    transformViews: false
}));

app.set('databaseConnection', knex({
    client: 'mysql',
    connection: envConfig.database.connection
}));

//HOME
app.get('/', routeIndex.index);
//CONTENT
app.get('/contact.html', routeContent.index);
app.get('/accessibility.html', routeContent.index);
app.get('/terms-of-service.html', routeContent.index);
app.get('/privacy-policy.html', routeContent.index);
app.get('/subscribe.html', routeContent.index);
app.get('/unsubscribe.html', routeContent.index);
app.get('/404.html', routeContent.index);
//PDP
app.get('/**/index.html', routePLP.index);
//PLP
app.get('/**/*.html', routePDP.index);

https.createServer({
    key: fs.readFileSync(envConfig.ssl.key),
    cert: fs.readFileSync(envConfig.ssl.cert)
}, app).listen(envConfig.ssl.port, () => console.log('https server running on port ' + envConfig.ssl.port)).on('error', console.log);
