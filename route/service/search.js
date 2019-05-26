import configPrivate from '../../configPrivate.json';

/* MODELS
 *************************************/

import StoreSearch from '../../store/search';

/* ROUTE
 *************************************/

exports.get = function(req, res) {

    let searchParams = {};

    let storeSearch = new StoreSearch(req.app);

    if (req.query.q) {
        searchParams.q = req.query.q;
    }

    Promise.all([
        storeSearch.store.dispatch(
            storeSearch.getAll(searchParams)
        )
    ])
    .then(() => {
        res.header(configPrivate.header.json)
            .status(200)
            .send(storeSearch.store.getState());
    })
    .catch((error) => {
        res.header(configPrivate.header.json)
            .status(404)
            .send(error);
    });
};
