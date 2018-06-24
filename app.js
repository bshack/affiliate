const fs = require('fs');
const express = require('express');
const https = require('https');
const http = require('http');
const session = require('express-session');
const app = express();
const fetch = require('node-fetch');
const knex = require('knex');
const redux = require('redux');
const thunk = require('redux-thunk').default;
const nodeJSX = require('node-jsx').install();

app.use(session({
    secret: 'fiRfYZy8iCE2eKba8S6XFcZb',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));

app.set('databaseConnection', knex({
    //debug: true,
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        port: '8889',
        password : 'root',
        database : 'sd'
    }
}));

app.set('views', './views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine({}));

function getSiteData(state = {}, action) {
  switch (action.type) {
  case 'GET_SITE_DATA':
    state = action.data
    return state;
  case 'GET_SITE_DATA_ERROR':
    return state;
  default:
    return state;
  }
}

function updateSite(data) {
  return {
    type: 'GET_SITE_DATA',
    data
  };
}

function handleError(hostname, error) {
  return {
    type: 'GET_SITE_DATA_ERROR',
    error
  };
}


function getSite(hostname) {

  return function (dispatch, getState) {

      return app.get('databaseConnection')
          .from('website')
          .select('*')
          .where({
              hostname: hostname
          })
          .then((data) => {
             dispatch(updateSite(data));
          })
          .catch((error) => {
              dispatch(handleError(hostname, error));
          });
  };
}




let siteModel = redux.createStore(
    getSiteData,
    redux.applyMiddleware(thunk)
);

siteModel.subscribe(() =>
  console.log(siteModel.getState())
)

siteModel.dispatch(
  getSite('localhost')
).then(() => {
  console.log('Done!');
});



const routeIndex = require('./routes/index');
const routeCategory = require('./routes/category');
const routeProduct = require('./routes/product');
const routeContent = require('./routes/content');





app.get('databaseConnection')
    .from('website')
    .select('*')
    .where({
        hostname: 'localhost'
    })
    .then((data) => {
        //console.log(data);
    });

app.get('databaseConnection')
    .select('websitecategory.category')
    .from('website')
    .innerJoin('websitecategory', 'website.id', 'websitecategory.website')
    .where({
        'website.hostname': 'localhost'
    })
    .then((data) => {
        //console.log(data);
    });

app.get('/', routeIndex.index);

app.get('/category/:categoryID', routeCategory.category);

app.get('/category/:categoryID/product/:productID', routeProduct.product);

app.get('/category/:categoryID/content/:contentID', routeContent.content);

https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}, app).listen(3000, () => console.log('Example app listening on port 3000!'));
