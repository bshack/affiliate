import sm from 'sitemap';
import configPrivate from '../configPrivate.json';
import config from '../configPublic.json';

/* MODELS
 *************************************/

import StoreContent from '../store/content';
import StoreProduct from '../store/product';


/* ROUTE
 *************************************/

exports.index = function(req, res) {

    let storeContent = new StoreContent(req.app);
    let storeProduct = new StoreProduct(req.app);

    Promise.all([
        storeContent.store.dispatch(
            storeContent.getAll({
                isActive: true
            })
        ),
        storeProduct.store.dispatch(
            storeProduct.getAll({
                isActive: true,
                limit: false
            })
        )
    ]).then(() => {

        let urls = [];
        let contentPages = storeContent.store.getState();
        let productPages = storeProduct.store.getState();
        let categoryPages = [];
        let brandPages = [];
        let storePages = [];

        // add content pages
        let i;
        for (i = 0; i < contentPages.length; i++) {
            urls.push({
                url: config.www.origin + '/' + contentPages[i].filename + '.html'
            });
        }

        // add product pages
        let ii;
        for (ii = 0; ii < productPages.length; ii++) {

            let categoryUrl = config.www.origin + '/' + productPages[ii].path + '/index.html';
            let storeUrl = config.www.origin + '/store/' + productPages[ii].programName + '/index.html';
            let brandUrl = config.www.origin + '/brand/' + productPages[ii].brand + '/index.html';
            let record = {
                url: config.www.origin + '/' + productPages[ii].path + '/' + productPages[ii].seoFilenamePart + '.html',
                img: []
            }
            if (productPages[ii].isImageLinkProcessed) {
                record.img.push({
                    url: config.cdn.origin + '/' + productPages[ii].path + '/' + productPages[ii].seoFilenamePart + '-source.jpg',
                    title: productPages[ii].title
                });
            }
            if (productPages[ii].isAdditionalImageLinkProcessed) {
                record.img.push({
                    url: config.cdn.origin + '/' + productPages[ii].path + '/' + productPages[ii].seoFilenamePart + '-additional-source.jpg',
                    title: productPages[ii].title
                });
            }
            if (categoryPages.indexOf(categoryUrl) === -1) {
                categoryPages.push(categoryUrl);
            }
            if (brandPages.indexOf(brandUrl) === -1) {
                brandPages.push(brandUrl);
            }
            if (storePages.indexOf(storeUrl) === -1) {
                storePages.push(storeUrl);
            }

            urls.push(record);

        }

        // add category pages
        let iii;
        for (iii = 0; iii < categoryPages.length; iii++) {
            urls.push({
                url: categoryPages[iii]
            });
        }

        // add store pages
        let iiii;
        for (iiii = 0; iiii < brandPages.length; iiii++) {
            if (brandPages[iiii] !== '') {
                urls.push({
                    url: brandPages[iiii]
                });
            }
        }

        // add brand pages
        let iiiii;
        for (iiiii = 0; iiiii < storePages.length; iiiii++) {
            if (storePages[iiiii] !== '') {
                urls.push({
                    url: storePages[iiiii]
                });
            }
        }

        res.header(configPrivate.header.xml);
        res.send(sm.createSitemap ({
            urls: urls
        }).toString());

    });

};
