'use strict';
module.exports = {
    route: (req, res) => {
        console.log(req.session.hostname);
        res.send(req.params.categoryID);
    }
};
