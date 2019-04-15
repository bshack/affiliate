exports.index = function(req, res) {

    res.header('Content-Type', 'text/plain');
    res.send(
`User-agent: *
Disallow: /error-404.html
Sitemap: ` + req.app.get('configPublic').store.getState().www.origin + `/sitemap.xml`
    );

};
