import fs from 'fs';
import configPublic from '../configPublic.json';

class File {

    updateStaticAssetVersion(staticAssetDirectory) {

        let directories = fs.readdirSync(staticAssetDirectory + '/');
        directories = directories.sort(function(a, b) {
           return fs.statSync(staticAssetDirectory + '/' + a).mtime.getTime() -
                  fs.statSync(staticAssetDirectory + '/' + b).mtime.getTime();
        });
        configPublic.static.version = directories.pop();
        fs.writeFileSync('./configPublic.json', JSON.stringify(configPublic));

        return true;

    }

}

module.exports = File;
