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
                './models/*.js',
                './views/*.jsx',
                './layouts/*.jsx'
            ]
        },
        style: {
            // scsslint config file
            scssLint: '.scss-lint.yml',
            source: {
                // glob of all scss files
                scss: [
                    'assets/style/*.scss',
                    'assets/style/**/*.scss'
                ],
                // glob of all css files
                css: [
                    'assets/style/*.css'
                ]
            },
            // where to save style files
            destination: {
                watch: 'assets/style',
                release: 'assets/style'
            }
        }
    }
};
