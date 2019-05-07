import React from 'react';
import ReactDOM from 'react-dom';
import EmailSignUpTemplate from './template/emailSignUp.jsx';

export default function() {

    let container = document.querySelector('.email-sign-up');

    if (container) {
        ReactDOM.render(
            <EmailSignUpTemplate />,
            container
        );
    }

}
