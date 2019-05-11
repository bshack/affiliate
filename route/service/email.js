const Mailchimp = require('mailchimp-api-v3')
const crypto = require('crypto');
const Regex = require('../../utility/regex');

const regex = new Regex();
const responseHeader = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
};
const makeMD5Hash = (string) => {
    return crypto.createHash('md5').update(string).digest('hex');
}

const subscribeSuccessMessage = 'Thank you, you have been subscribed successfully.';
const subscribeFailureMessage = 'Sorry there was an error, your email address was not valid.';
const unsubscribeSuccessMessage = 'Thank you, you have been unsubscribed successfully.';
const unsubscribeFailureMessage = 'Sorry there was an error, your email address was not found.';

exports.subscribe = function(req, res) {

    let email = req.body.email;

    if (regex.email.test(email)) {

        let mailchimp = new Mailchimp(req.app.get('configPrivate').store.getState().email.apiKey);
        let list = req.app.get('configPrivate').store.getState().email.lists.default.id;

        mailchimp.put({
            path : '/lists/' + list + '/members/' + makeMD5Hash(email),
            body : {
                email_address : email,
                status : 'subscribed'
            }
        })
        .then((result) => {
            res.header(responseHeader)
                .status(result.statusCode)
                .send({
                    success: true,
                    message: subscribeSuccessMessage
                });
        })
        .catch((err) => {
            res.header(responseHeader)
                .status(err.status)
                .send({
                    success: false,
                    message: subscribeFailureMessage
                });
        });

    } else {
        res.header(responseHeader)
            .status(res.statusCode)
            .send({
                success: false,
                message: subscribeFailureMessage
            });
    }

};

exports.unsubscribe = function(req, res) {

    let email = req.body.email;

    if (regex.email.test(email)) {

        let mailchimp = new Mailchimp(req.app.get('configPrivate').store.getState().email.apiKey);
        let list = req.app.get('configPrivate').store.getState().email.lists.default.id;

        mailchimp.patch({
            path : '/lists/' + list + '/members/' + makeMD5Hash(email),
            body : {
                email_address : email,
                status : 'unsubscribed'
            }
        })
        .then((result) => {
            res.header(responseHeader)
                .status(result.statusCode)
                .send({
                    success: true,
                    message: unsubscribeSuccessMessage
                });
        })
        .catch((err) => {
            res.header(responseHeader)
                .status(err.status)
                .send({
                    success: false,
                    message: unsubscribeFailureMessage
                });
        });

    } else {

        res.header(responseHeader)
            .status(result.statusCode)
            .send({
                success: false,
                message: unsubscribeFailureMessage
            });

    }

};
