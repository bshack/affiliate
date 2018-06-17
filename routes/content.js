'use strict';
module.exports = {
    route: (req, res) => {
        res.send(req.params.contentID);
    }
};
