import redis from 'redis';
import apicache from 'apicache';
import crypto from 'crypto';
import configPrivate from '../configPrivate';

const client = redis.createClient();
const routeCacher = apicache.options({
    debug: false,
    defaultDuration: '1 hour',
    redisClient: client,
    enabled: configPrivate.cache.isEnabled,
    statusCodes: {
        exclude: [404, 403, 500],
    }
}).middleware;

class Cache {

    constructor() {
        client.on('error', console.error);
    }

    initialize() {
        return this.flush()
            .then((data) => {
                console.log('backend cache flushed', data);
            })
            .catch(console.error);
    }

    routeCacher(time) {
        if (time) {
            return routeCacher(time);
        } else {
            return routeCacher();
        }
    }

    flush() {
        return new Promise((resolve, reject) => {
            client.flushdb((error, succeeded) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(succeeded);
                }
            });
        });
    }

    makeKey(value) {

        let hash = crypto.createHash('md5');

        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }

        hash.setEncoding('hex');
        hash.write(value);
        hash.end();

        return hash.read();

    }

    set(key, value) {
        return new Promise((resolve, reject) => {
            client.set(key, value, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    get(key) {
        return new Promise((resolve, reject) => {
            client.get(key, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    setJSON(key, value) {
        return new Promise((resolve, reject) => {
            value = JSON.stringify(value);
            client.set(key, value, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    getJSON(key) {
        return new Promise((resolve, reject) => {
            client.get(key, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    data = JSON.parse(data);
                    resolve(data);
                }
            });
        });
    }

}

module.exports = new Cache();
