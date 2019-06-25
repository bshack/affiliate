import Mailchimp from 'mailchimp-api-v3';
import Regex from '../../utility/regex';
import crypto from 'crypto';
import configPrivate from '../../configPrivate.json';

const regex = new Regex();
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

        let mailchimp = new Mailchimp(configPrivate.email.apiKey);
        let list = configPrivate.email.lists.default.id;

        mailchimp.put({
            path : '/lists/' + list + '/members/' + makeMD5Hash(email),
            body : {
                email_address : email,
                status : 'subscribed'
            }
        })
        .then((result) => {
            res.header(configPrivate.header.json)
                .status(result.statusCode)
                .send({
                    success: true,
                    message: subscribeSuccessMessage
                });
        })
        .catch((err) => {
            res.header(configPrivate.header.json)
                .status(err.status)
                .send({
                    success: false,
                    message: subscribeFailureMessage
                });
        });

    } else {
        res.header(configPrivate.header.json)
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

        let mailchimp = new Mailchimp(configPrivate.email.apiKey);
        let list = configPrivate.email.lists.default.id;

        mailchimp.patch({
            path : '/lists/' + list + '/members/' + makeMD5Hash(email),
            body : {
                email_address : email,
                status : 'unsubscribed'
            }
        })
        .then((result) => {
            res.header(configPrivate.header.json)
                .status(result.statusCode)
                .send({
                    success: true,
                    message: unsubscribeSuccessMessage
                });
        })
        .catch((err) => {
            res.header(configPrivate.header.json)
                .status(err.status)
                .send({
                    success: false,
                    message: unsubscribeFailureMessage
                });
        });

    } else {

        res.header(configPrivate.header.json)
            .status(result.statusCode)
            .send({
                success: false,
                message: unsubscribeFailureMessage
            });

    }

};
