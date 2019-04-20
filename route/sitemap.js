const path = require('path');
const sm = require('sitemap');


/* MODELS
 *************************************/

const ModelContent = require('../model/content');
const ModelProduct = require('../model/product');


/* ROUTE
 *************************************/

exports.index = function(req, res) {

    let modelContent = new ModelContent(req.app);
    let modelProduct = new ModelProduct(req.app);

    Promise.all([
        modelContent.store.dispatch(
            modelContent.getAll({
                isActive: true
            })
        ),
        modelProduct.store.dispatch(
            modelProduct.getAll({
                isActive: true
            })
        )
    ]).then(() => {

        let urls = [];
        let configPublic = req.app.get('configPublic').store.getState();
        let contentPages = modelContent.store.getState();
        let productPages = modelProduct.store.getState();
        let categoryPages = [];

        // add content pages
        let i;
        for (i = 0; i < contentPages.length; i++) {
            urls.push({
                url: configPublic.www.origin + '/' + contentPages[i].filename + '.html'
            });
        }

        // add product pages
        let ii;
        for (ii = 0; ii < productPages.length; ii++) {

            let categoryUrl = configPublic.www.origin + '/' + productPages[ii].path + '/index.html';
            let record = {
                url: configPublic.www.origin + '/' + productPages[ii].path + '/' + productPages[ii].seoFilenamePart + '.html',
                img: []
            }
            if (productPages[ii].isImageLinkProcessed) {
                record.img.push({
                    url: configPublic.cdn.origin + '/' + productPages[ii].path + '/' + productPages[ii].seoFilenamePart + '-source.jpg',
                    title: productPages[ii].title
                });
            }
            if (productPages[ii].isAdditionalImageLinkProcessed) {
                record.img.push({
                    url: configPublic.cdn.origin + '/' + productPages[ii].path + '/' + productPages[ii].seoFilenamePart + '-additional-source.jpg',
                    title: productPages[ii].title
                });
            }
            if (categoryPages.indexOf(categoryUrl) === -1) {
                categoryPages.push(categoryUrl);
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

        res.header('Content-Type', 'application/xml');
        res.send(sm.createSitemap ({
            urls: urls
        }).toString());

    });

};
