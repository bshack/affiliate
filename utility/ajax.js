'use strict';

class AJAX {

    request(settings) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    let response = JSON.parse(xhr.response);
                    if (xhr.status === 200 && response.success === true) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                }
            }
            xhr.open(settings.method, settings.url);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.send(JSON.stringify(settings.params));
        });
    }

}

module.exports = AJAX;
