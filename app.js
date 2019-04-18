const fs = require('fs');
const express = require('express');
const session = require('express-session');
const https = require('https');
const nodeJSX = require('node-jsx').install();
const knex = require('knex');

/* MODELS
*************************************/

const ModelConfig = require('./models/config');


/* ROUTES
*************************************/

const routeRobots = require('./routes/robots');
const routeSitemap = require('./routes/sitemap');
const routeIndex = require('./routes/index');
const routeContent = require('./routes/content');
const routePLP = require('./routes/plp');
const routePDP = require('./routes/pdp');

const routeEmail = require('./routes/email');


/* EXPRESS SERVER
*************************************/

const app = express();

app.set('configPrivate', new ModelConfig(require('./configPrivate.json')));
app.set('configPublic', new ModelConfig(require('./configPublic.json')));
app.set('views', './layouts');
app.set('view engine', 'jsx');
app.set('databaseConnection', knex({
    client: 'mysql',
    connection: app.get('configPrivate').store.getState().database.connection
}));
app.use(session({
    secret: app.get('configPrivate').store.getState().session.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));
app.use(express.static('dist'))
app.engine('jsx', require('express-react-views').createEngine({
    transformViews: false
}));


/* INIT ROUTES
*************************************/

//search engines
app.get('/robots.txt', routeRobots.index);
app.get('/sitemap.xml', routeSitemap.index);

//home
app.get('/', routeIndex.index);

//content
app.get('/support.html', routeContent.index);
app.get('/privacy-policy.html', routeContent.index);
app.get('/terms-of-service.html', routeContent.index);
app.get('/manage-subscription.html', routeContent.index);
app.get('/unsubscribe.html', routeContent.index);
app.get('/accessibility.html', routeContent.index);
app.get('/search.html', routeContent.index);
app.get('/style-guide.html', routeContent.index);
app.get('/error-404.html', routeContent.index);

//plp
app.get('/brand/:brand/index.html', routePLP.index);
app.get('/store/:store/index.html', routePLP.index);
app.get('/**/index.html', routePLP.index);

//pdp
app.get('/**/*.html', routePDP.index);

//email
app.get('/email', routeEmail.index);


/* SERVER STARTUP
*************************************/

https.createServer({
    key: fs.readFileSync(app.get('configPrivate').store.getState().ssl.key),
    cert: fs.readFileSync(app.get('configPrivate').store.getState().ssl.cert)
}, app)
    .listen(app.get('configPrivate').store.getState().ssl.port,
        () => {
            console.log('https server running on port ' + app.get('configPrivate').store.getState().ssl.port)
        })
    .on('error', console.log);
