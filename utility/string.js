'use strict';

class String {

    getQueryStringParamater(name, url) {
        /*eslint-disable*/
        name = name.replace(/[\[\]]/g, '\\$&');
        /*eslint-enable*/
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        let results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

}

module.exports = String;
