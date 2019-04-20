exports.index = function(req, res) {

    res.header('Content-Type', 'text/plain');

    if (req.app.get('configPrivate').store.getState().isProduction) {
        res.send(
`User-agent: *
Disallow: /error-404.html
Sitemap: ` + req.app.get('configPublic').store.getState().www.origin + `/sitemap.xml`
        );
    } else {
        res.send(
`User-agent: *
Disallow: /`
        );
    }

};
