'use strict';
module.exports = {
    route: (req, res) => {
        req.session.hostname = req.hostname;
        res.send(req.hostname);
    }
};
