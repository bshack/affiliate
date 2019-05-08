const responseHeader = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
};

exports.get = function(req, res, next) {

    let params = req.query;

    let whereParams = {};

    if (params.brand) {
        return dispatch(this.handleGetSuccess([
            {
                title: params.brand
            }
        ]));
    } else if (params.programName) {
        return dispatch(this.handleGetSuccess([
            {
                title: params.programName
            }
        ]));
    } else if (params.path) {
        whereParams.path = params.path;
    }

    return req.app.get('databaseConnection')
        .from('category')
        .select()
        .where(whereParams)
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
