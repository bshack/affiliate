const React = require('react');
const ReactDOM = require('react-dom');
const EmailUnsubscribeTemplate = require('./template/emailUnsubscribe.jsx');
const UtilityString = require('../utility/string');

const utilityString = new UtilityString();

export default function() {

    let container = document.querySelector('.email-unsubscribe');
    let emailUnsubscribe = {
        email: utilityString.getQueryStringParamater('email', window.location.href)
    }

    if (container) {
        ReactDOM.render(
            <EmailUnsubscribeTemplate data={emailUnsubscribe} />,
            container
        );
    }

}
