'use strict';

// ## Load Modules

const yargs = require('yargs').argv;

// ## paths
module.exports = {
    // ## Path Variables
    path: {
        root: './',
        server: {
            entry: './app.js',
            source: [
                './app.js',
                './routes/*.js',
                './views/*.jsx',
                './layouts/*.jsx'
            ]
        }
    }
};
