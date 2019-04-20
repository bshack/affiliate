exports.index = function(req, res) {

    res.header('Content-Type', 'application/json');

    res.send({
        foo: 'bar'
    });

};
