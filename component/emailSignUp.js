const React = require('react');
const ReactDOM = require('react-dom');
const EmailSignUpTemplate = require('./template/emailSignUp.jsx');

export default function() {

    ReactDOM.render(
        <EmailSignUpTemplate />,
        document.querySelector('.email-sign-up')
    );

}
