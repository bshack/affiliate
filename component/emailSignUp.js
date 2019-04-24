const React = require('react');
const ReactDOM = require('react-dom');
const EmailSignUpTemplate = require('./template/emailSignUp.jsx');

export default function() {

    let container = document.querySelector('.email-sign-up');

    if (container) {
        ReactDOM.render(
            <EmailSignUpTemplate />,
            container
        );
    }

}
