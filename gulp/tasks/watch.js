'use strict';

// ## Load Modules

const gulp = require('gulp');
const gls = require('gulp-live-server');

// ## Environment Config

const config = require('../config');

// ## Watch Task

gulp.task('serve', function() {

    var server = gls.new('app.js');

    server.start();

    gulp.watch(config.path.server.source, () => {
        server.start.bind(server)();
    });

});
