import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import config from '../configPublic';

class JSONLD {

    corporation() {

        return <script
            type = 'application/ld+json'
            dangerouslySetInnerHTML = {
                {
                    __html: JSON.stringify({
                        '@context': 'http://schema.org',
                        '@type': 'Corporation',
                        '@id': config.www.origin + '#Corporation',
                        'name': config.name,
                        'additionalType': 'Brand',
                        'legalName': 'Val Foundry, LLC',
                        'url': config.www.origin,
                        'logo': config.www.origin + '/default/' + config.social.image,
                        'description': config.description,
                        'email': 'help@valfoundry.io',
                        'slogan': 'Val Foundry, we know what the deal is.',
                        'sameAs': [
                            'https://www.facebook.com/valfoundry',
                            'https://twitter.com/valfoundry'
                        ]
                    })
                }
            }
        />

    }

    product(data) {
        let defaultJSONLD = {
            '@context': 'http://schema.org/',
            '@type': 'Product',
            'brand': {
                '@type': 'Thing'
            },
            'offers': {
                '@type': 'Offer',
                'seller': {
                    '@type': 'Organization'
                }
            }
        };
        let defaultProductData = {
            brand: {},
            offers: {
                seller: {},
                availability: {}
            }
        };
        if (data.path && data.seoFilenamePart) {
            defaultProductData.url = (config.www.origin + '/' + data.path + '/' + data.seoFilenamePart + '.html');
            defaultProductData.offers.url = defaultProductData.url;
        }
        if (data.title !== '') {
            defaultProductData.name = data.title;
        }
        if (data.path && data.seoFilenamePart && data.isImageLinkProcessed) {
            defaultProductData.image = (config.www.origin + '/' +
                data.path + '/' + data.seoFilenamePart + '-large@2x.jpg');
        }
        if (data.description !== '') {
            defaultProductData.description = data.description;
        }
        if (data.googleProductCategoryName !== '') {
            defaultProductData.category = data.googleProductCategoryName;
        }
        if (data.color !== '') {
            defaultProductData.color = data.color;
        }
        if (data.material !== '') {
            defaultProductData.material = data.material;
        }
        if (data.id) {
            defaultProductData.sku = data.id;
        }
        if (data.mpn !== '') {
            defaultProductData.mpn = data.mpn;
        }
        if (data.brandName !== '') {
            defaultProductData.brand.name = data.brandName;
        }
        if (data.storeName !== '') {
            defaultProductData.offers.seller.name = data.storeName;
        }
        if (data.availability === 'in stock') {
            defaultProductData.offers.availability = 'http://schema.org/InStock';
        } else if (data.availability === 'out of stock') {
            defaultProductData.offers.availability = 'http://schema.org/OutOfStock';
        } else if (data.availability === 'preorder') {
            defaultProductData.offers.availability = 'http://schema.org/PreOrder';
        }
        if (data.productCondition === 'new') {
            defaultProductData.offers.itemCondition = 'http://schema.org/NewCondition';
        } else if (data.productCondition === 'refurbished') {
            defaultProductData.offers.itemCondition = 'http://schema.org/RefurbishedCondition';
        } else if (data.productCondition === 'used') {
            defaultProductData.offers.itemCondition = 'http://schema.org/UsedCondition';
        }
        if (data.salePriceCurrency) {
            defaultProductData.offers.priceCurrency = data.salePriceCurrency;
        } else if (data.priceCurrency) {
            defaultProductData.offers.priceCurrency = data.priceCurrency;
        } else {
            defaultProductData.offers.priceCurrency = 'USD';
        }
        if (data.salePriceUnformatted) {
            defaultProductData.offers.price = data.salePriceUnformatted;
        } else if (data.priceUnformatted) {
            defaultProductData.offers.price = data.priceUnformatted;
        }
        if (data.expirationDate) {
            defaultProductData.offers.priceValidUntil = moment(data.expirationDate).toISOString();
        }
        if (data.gtin) {
            let gtinLength = data.gtin.toString().length;
            if (gtinLength === 8) {
                defaultProductData.gtin8 = data.gtin;
            } else if (gtinLength === 12) {
                defaultProductData.gtin12 = data.gtin;
            } else if (gtinLength === 13) {
                defaultProductData.gtin13 = data.gtin;
            } else if (gtinLength === 14) {
                defaultProductData.gtin13 = data.gtin;
            }
        }

        return <script
            type = 'application/ld+json'
            dangerouslySetInnerHTML = {
                {
                    __html: JSON.stringify(_.extend({}, defaultJSONLD, defaultProductData))
                }
            }
        />
    }

    siteNavigationElement(data) {
        let defaultJSONLD = {
            '@context': 'https://schema.org',
            '@graph': []
        };
        let recursiveBuilder = (data) => {
            let siteNavigationElements = [];
            let key;
            for (key in data) {
                if (data[key].path !== '') {
                    siteNavigationElements.push({
                        '@context': 'https://schema.org',
                        '@type': 'SiteNavigationElement',
                        'name': data[key].title,
                        'url': config.www.origin + '/' + data[key].path + '/index.html'
                    });
                    if (_.size(data[key].children)) {
                        siteNavigationElements =
                            _.unionBy(recursiveBuilder(data[key].children), siteNavigationElements, 'name');
                    }
                }
            }
            return siteNavigationElements;
        };
        defaultJSONLD['@graph'] = recursiveBuilder(data);
        return <script
            type = 'application/ld+json'
            dangerouslySetInnerHTML = {
                {
                    __html: JSON.stringify(defaultJSONLD)
                }
            }
        />

    }

    breadcrumbs(data) {
        let defaultJSONLD = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': []
        };
        let recursiveBuilder = (data) => {
            let itemListElement = [];
            let position = 1;
            let key;
            for (key in data) {
                itemListElement.push({
                    '@type': 'ListItem',
                    'position': position,
                    'item': {
                        '@id': config.www.origin + '/' + (data[key].path? data[key].path +
                                '/index.html' : data[key].filename + '.html'),
                        'name': data[key].title
                    }
                });
                position = (position + 1);
            }
            return itemListElement;
        };
        defaultJSONLD['itemListElement'] = recursiveBuilder(data);
        return <script
            type = 'application/ld+json'
            dangerouslySetInnerHTML = {
                {
                    __html: JSON.stringify(defaultJSONLD)
                }
            }
        />

    }


}

export default JSONLD;
