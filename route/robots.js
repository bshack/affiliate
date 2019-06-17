import configPrivate from '../configPrivate.json';
import config from '../configPublic.json';

exports.index = function(req, res) {

    res.header(configPrivate.header.text);

    if (configPrivate.isProduction) {
        res.send(
`User-agent: *
Disallow: /error-404.html
Sitemap: ` + config.www.origin + `/sitemap.xml`
        );
    } else {
        res.send(
`User-agent: *
Disallow: /`
        );
    }

};
