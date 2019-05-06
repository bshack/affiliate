const moment = require('moment');
const requestHeader = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
};

exports.get = function(req, res, next) {

    let params = req.body;

    let whereParams = {
        isActive: true
    };

    let offsetParam = 0;
    let limitParam = 1000;
    let skipParam = false;
    let oldestProductCreationDate = moment(new Date()).subtract(60, 'days').format('YYYY-MM-DD HH:mm:ss');

    if (params.offset && (parseInt(params.offset, 10) > offsetParam)) {
        offsetParam = parseInt(params.offset, 10);
    }

    if (params.id) {
        whereParams.id = parseInt(params.id);
    }

    if (params.filename) {
        whereParams.seoFilenamePart = params.filename;
    }

    if (params.brand) {
        whereParams.brand = params.brand;
    }

    if (params.programName) {
        whereParams.programName = params.programName;
    }

    if (params['product.isFeatured']) {
        whereParams['product.isFeatured'] = params['product.isFeatured'];
    }

    if (params.limit && (parseInt(params.limit, 10) <= limitParam)) {
        limitParam = parseInt(params.limit, 10);
    }

    if (params.skipFilename) {
        skipParam = params.skipFilename;
    }

    return req.app.get('databaseConnection')
        .from('product')
        .select([
            'product.*',
            'category.isFeatured',
            'category.path',
            'category.title AS categoryTitle'
        ])
        .limit(limitParam)
        .innerJoin('category', 'product.googleProductCategory', 'category.googleid')
        .where((builder) => {
            if (params.path && !params.filename) {
                if (skipParam) {
                    builder
                        .where(whereParams)
                        .where('product.timestamp', '>', oldestProductCreationDate)
                        .andWhere('category.path', 'like', '%' + params.path)
                        .whereNot('product.seoFilenamePart', skipParam);
                } else {
                    builder
                        .where(whereParams)
                        .where('product.timestamp', '>', oldestProductCreationDate)
                        .andWhere('category.path', 'like', '%' + params.path);
                }
            } else {
                builder
                    .where(whereParams)
                    .where('product.timestamp', '>', oldestProductCreationDate);
            }
        })
        .offset(offsetParam)
        .orderBy('product.isFeatured', 'desc')
        .orderBy('category.isFeatured', 'desc')
        .orderBy('product.timestamp', 'desc')
        .then((data) => {
            res.header(requestHeader)
                .status(200)
                .send({
                    success: false,
                    config: req.app.get('configPublic').store.getState(),
                    data: data
                });
        })
        .catch((error) => {
            res.header(requestHeader)
                .status(200)
                .send({
                    success: false,
                    config: req.app.get('configPublic').store.getState(),
                    message: 'nope'
                });
        });

};
