import React from 'react';
import ReactDOM from 'react-dom';
import EmailUnsubscribeTemplate from './template/emailUnsubscribe.jsx';
import UtilityString from '../utility/string';

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
