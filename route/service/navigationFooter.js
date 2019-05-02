const responseHeader = {
    'Content-Type': 'application/json;charset=utf-8'
};

exports.get = function(req, res, next) {

    let params = req.body;

    let whereParams = {
        'content.isActive': true,
        'menu-link.isActive': true,
        'menu.isActive': true
    };

    return req.app.get('databaseConnection')
        .from('menu-link')
        .join('content', 'menu-link.content', '=', 'content.filename')
        .join('menu', 'menu-link.menu', '=', 'menu.name')
        .select([
            'menu-link.*',
            'content.title',
            'content.filename'
        ])
        .where(whereParams)
        .orderBy('menu-link.position', 'asc')
        .then((data) => {
            res.header(responseHeader)
                .status(200)
                .send({
                    success: false,
                    data: data
                });
        })
        .catch((error) => {
            res.header(responseHeader)
                .status(200)
                .send({
                    success: false,
                    message: 'nope'
                });
        });

};
