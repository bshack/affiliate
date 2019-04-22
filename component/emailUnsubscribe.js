const React = require('react');
const ReactDOM = require('react-dom');
const EmailUnsubscribeTemplate = require('./template/emailUnsubscribe.jsx');

export default function() {

    let container = document.querySelector('.email-unsubscribe');

    if (container) {
        ReactDOM.render(
            <EmailUnsubscribeTemplate />,
            container
        );
    }

}
