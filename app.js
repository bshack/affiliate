require("@babel/register");
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const https = require('https');
const knex = require('knex');
const configPrivate = require('./configPrivate.json');

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
app.use(express.static('dist'))
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
app.get('/terms-of-service.html', routeContent.index);
app.get('/manage-subscription.html', routeContent.index);
app.get('/accessibility.html', routeContent.index);
app.get('/search.html', routeContent.index);
app.get('/style-guide.html', routeContent.index);
app.get('/error-404.html', routeContent.index);

//email marketing
app.get('/unsubscribe.html', routeUnsubscribe.index);

//plp
app.get('/brand/:brand/index.html', routePLP.index);
app.get('/store/:store/index.html', routePLP.index);
app.get('/**/index.html', routePLP.index);

//pdp
app.get('/**/*.html', routePDP.index);

//services
app.put('/service/email/subscribe', routeServiceEmail.subscribe);
app.patch('/service/email/unsubscribe', routeServiceEmail.unsubscribe);
app.get('/service/page/index', routeServicePageIndex.get);
app.get('/service/page/content', routeServicePageContent.get);
app.get('/service/page/plp', routeServicePagePLP.get);
app.get('/service/page/pdp', routeServicePagePDP.get);
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
