const configProduction = require('./webpack.config.production');
const configDevelopment = require('./webpack.config.development');

function buildConfig(env) {
    if (env && (env.production === 'true' || env.production === true)) {
        return configProduction;
    } else {
        return configDevelopment;
    }
};

module.exports = buildConfig;
