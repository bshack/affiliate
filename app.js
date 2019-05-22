require("@babel/register");
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

/* SETUP VERSIONED ASSET DIRECTORY
*************************************/

utilityFile = new UtilityFile();

utilityFile.updateStaticAssetVersion(staticAssetDirectory);


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
const routeServiceEmail = require('./route/service/email');
const routeServiceSearch = require('./route/service/search');
const routeServicePageIndex = require('./route/service/page/index');
const routeServicePageContent = require('./route/service/page/content');
const routeServicePagePLP = require('./route/service/page/plp');
const routeServicePagePDP = require('./route/service/page/pdp');
const routeServicePageUnsubscribe = require('./route/service/page/unsubscribe');

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
app.use(express.static(staticAssetDirectory));
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
app.get('/', utilityCache.routeCacher(), routeIndex.index);

//content
app.get('/support.html', utilityCache.routeCacher(), routeContent.index);
app.get('/privacy-policy.html', utilityCache.routeCacher(), routeContent.index);
app.get('/terms-of-service.html', utilityCache.routeCacher(), routeContent.index);
app.get('/manage-subscription.html', utilityCache.routeCacher(), routeContent.index);
app.get('/accessibility.html', utilityCache.routeCacher(), routeContent.index);
app.get('/search.html', utilityCache.routeCacher(), routeContent.index);
app.get('/style-guide.html', utilityCache.routeCacher(), routeContent.index);
app.get('/error-404.html', utilityCache.routeCacher(), routeContent.index);

//email marketing
app.get('/unsubscribe.html', utilityCache.routeCacher(), routeUnsubscribe.index);

//plp
app.get('/brand/:brand/index.html', utilityCache.routeCacher(), routePLP.index);
app.get('/store/:store/index.html', utilityCache.routeCacher(), routePLP.index);
app.get('/**/index.html', utilityCache.routeCacher(), routePLP.index);

//pdp
app.get('/**/*.html', utilityCache.routeCacher(), routePDP.index);

//services
app.get('/service/search', utilityCache.routeCacher(), routeServiceSearch.get);
app.put('/service/email/subscribe', routeServiceEmail.subscribe);
app.patch('/service/email/unsubscribe', routeServiceEmail.unsubscribe);
app.get('/service/page/index', utilityCache.routeCacher(), routeServicePageIndex.get);
app.get('/service/page/content', utilityCache.routeCacher(), routeServicePageContent.get);
app.get('/service/page/plp', utilityCache.routeCacher(), routeServicePagePLP.get);
app.get('/service/page/pdp', utilityCache.routeCacher(), routeServicePagePDP.get);
app.get('/service/page/unsubscribe', routeServicePageUnsubscribe.get);

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
