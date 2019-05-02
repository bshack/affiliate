const responseHeader = {
    'Content-Type': 'application/json;charset=utf-8'
};

exports.get = function(req, res, next) {

    let params = req.body;
    let whereParams = {
        isActive: true
    };

    if (params.filename) {
        whereParams.filename = params.filename;
    }

    return req.app.get('databaseConnection')
        .from('content')
        .select()
        .where((builder) => {
            if (whereParams.filename && typeof whereParams.filename === 'object') {
                let filenames = whereParams.filename;
                delete whereParams.filename;
                builder
                    .whereIn('filename', filenames)
                    .where(whereParams);
            } else {
                builder.where(whereParams);
            }
        })
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
