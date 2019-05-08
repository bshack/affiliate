require("@babel/register");
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const https = require('https');
const knex = require('knex');

/* MODELS
*************************************/

const ModelConfig = require('./model/config');


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
const routeServiceProducts = require('./route/service/products');
const routeServiceBreadcrumbs = require('./route/service/breadcrumbs');
const routeServiceCategories = require('./route/service/category');
const routeServiceContent = require('./route/service/content');
const routeServiceNavigationFooter = require('./route/service/navigationFooter');
const routeServiceNavigationMain = require('./route/service/navigationMain');

const routeServicePageIndex = require('./route/service/pageIndex');


/* EXPRESS SERVER
*************************************/

const app = express();

app.set('configPrivate', new ModelConfig(require('./configPrivate.json')));
app.set('configPublic', new ModelConfig(require('./configPublic.json')));
app.set('views', './component/layout');
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
app.get('/service/products/', routeServiceProducts.get);
app.get('/service/breadcrumbs/', routeServiceBreadcrumbs.get);
app.get('/service/categories/', routeServiceCategories.get);
app.get('/service/content/', routeServiceContent.get);
app.get('/service/navigation/footer/', routeServiceNavigationFooter.get);
app.get('/service/navigation/main/', routeServiceNavigationMain.get);
app.get('/service/page/index/', routeServicePageIndex.get);

/* SERVER STARTUP
*************************************/

https.createServer({
    key: fs.readFileSync(app.get('configPrivate').store.getState().ssl.key),
    cert: fs.readFileSync(app.get('configPrivate').store.getState().ssl.cert),
    ca: [fs.readFileSync(app.get('configPrivate').store.getState().ssl.ca)]
}, app)
    .listen(app.get('configPrivate').store.getState().ssl.port,
        () => {
            console.log('https server running on port ' + app.get('configPrivate').store.getState().ssl.port)
        })
    .on('error', console.log);
