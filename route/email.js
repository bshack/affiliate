const Mailchimp = require('mailchimp-api-v3')
const crypto = require('crypto');
const requestHeader = {
    'Content-Type': 'application/json;charset=utf-8'
};
const makeMD5Hash = (string) => {
    return crypto.createHash('md5').update(string).digest('hex');
}

exports.subscribe = function(req, res) {

    let mailchimp = new Mailchimp(req.app.get('configPrivate').store.getState().email.apiKey);
    let list = req.app.get('configPrivate').store.getState().email.lists.default.id;
    let email = req.body.email;

    mailchimp.put({
        path : '/lists/' + list + '/members/' + makeMD5Hash(email),
        body : {
            email_address : email,
            status : 'subscribed'
        }
    })
    .then(function (result) {
        res.header(requestHeader);
        res.send({
            success: true
        });
    })
    .catch(function (err) {
        res.header(requestHeader);
        res.send({
            success: false
        });
    });

};

exports.unsubscribe = function(req, res) {

    let mailchimp = new Mailchimp(req.app.get('configPrivate').store.getState().email.apiKey);
    let list = req.app.get('configPrivate').store.getState().email.lists.default.id;
    let email = req.body.email;

    mailchimp.patch({
        path : '/lists/' + list + '/members/' + makeMD5Hash(email),
        body : {
            email_address : email,
            status : 'unsubscribed'
        }
    })
    .then(function (result) {
        res.header(requestHeader);
        res.send({
            success: true
        });
    })
    .catch(function (err) {
        res.header(requestHeader);
        res.send({
            success: false
        });
    });

};
