//require('newrelic');
require('@babel/register');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const compression = require('compression');
const https = require('https');
const knex = require('knex');
const configPrivate = require('./configPrivate.json');
const configPublic = require('./configPublic.json');
const utilityCache = require('./utility/cache');
const UtilityFile = require('./utility/file');
const staticAssetDirectory = __dirname + '/' + configPublic.static.directory;

/* SETUP VERSIONED ASSET DIRECTORY LOCATION AND CACHING
*************************************/

utilityFile = new UtilityFile();

utilityFile.updateStaticAssetVersion(staticAssetDirectory);

let cacheConfigBrowser = {};

if (configPrivate.cache.isEnabled) {
    cacheConfigBrowser = configPrivate.cache.browser;
}


/* CLEAR BACKEND CACHE IF NOT ENABLED
*************************************/

utilityCache.initialize();


/* ROUTES
*************************************/

const routeRobots = require('./route/robots');
const routeSitemap = require('./route/sitemap');
const routeMerchant = require('./route/merchant');
const routeIndex = require('./route/index');
const routeContent = require('./route/content');
const routePLP = require('./route/plp');
const routePDP = require('./route/pdp');
const routeUnsubscribe = require('./route/unsubscribe');
const routeStyle = require('./route/style');
const routeServiceEmail = require('./route/service/email');
const routeServiceSearch = require('./route/service/search');
const routeServicePageIndex = require('./route/service/page/index');
const routeServicePageContent = require('./route/service/page/content');
const routeServicePagePLP = require('./route/service/page/plp');
const routeServicePagePDP = require('./route/service/page/pdp');
const routeServicePageUnsubscribe = require('./route/service/page/unsubscribe');
const routeServicePageStyle = require('./route/service/page/style');

/* EXPRESS SERVER
*************************************/

const app = express();

app.disable('x-powered-by');
app.set('views', './component/page');
app.set('view engine', 'jsx');
app.set('databaseConnection', knex({
    client: 'mysql',
    connection: configPrivate.database.connection
}));
app.use(session({
    secret: configPrivate.session.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));
app.use(compression());
app.use(express.static(staticAssetDirectory, cacheConfigBrowser));
app.use(express.json());
app.engine('jsx', require('express-react-views').createEngine({
    transformViews: false
}));


/* INIT ROUTES
*************************************/

//search engines
app.get('/robots.txt', routeRobots.index);
app.get('/sitemap.xml', routeSitemap.index);
app.get('/merchant.xml', routeMerchant.index);

//home
app.get('/', routeIndex.index);

//content
app.get('/support.html', routeContent.index);
app.get('/privacy-policy.html', routeContent.index);
app.get('/terms-and-conditions.html', routeContent.index);
app.get('/manage-subscription.html', routeContent.index);
app.get('/accessibility.html', routeContent.index);
app.get('/search.html', routeContent.index);
app.get('/error-404.html', routeContent.index);

//email marketing
app.get('/unsubscribe.html', routeUnsubscribe.index);

//plp
app.get('/brand/:brand/index.html', routePLP.index);
app.get('/store/:store/index.html', routePLP.index);
app.get('/**/index.html', routePLP.index);

//pdp
app.get('/**/*.html', routePDP.index);

//style guide
app.get('/style.html', routeStyle.index);

//services
app.get('/service/search', routeServiceSearch.get);
app.put('/service/email/subscribe', routeServiceEmail.subscribe);
app.patch('/service/email/unsubscribe', routeServiceEmail.unsubscribe);
app.get('/service/page/index', routeServicePageIndex.get);
app.get('/service/page/content', routeServicePageContent.get);
app.get('/service/page/plp', routeServicePagePLP.get);
app.get('/service/page/pdp', routeServicePagePDP.get);
app.get('/service/page/unsubscribe', routeServicePageUnsubscribe.get);
app.get('/service/page/style', routeServicePageStyle.get);


/* SERVER STARTUP
*************************************/

https.createServer({
    key: fs.readFileSync(configPrivate.ssl.key),
    cert: fs.readFileSync(configPrivate.ssl.cert),
    ca: [fs.readFileSync(configPrivate.ssl.ca)]
}, app)
    .listen(configPrivate.ssl.port,
        () => {
            console.log('https server running on port ' + configPrivate.ssl.port)
        })
    .on('error', console.log);
