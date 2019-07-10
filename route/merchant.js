import configPrivate from '../configPrivate.json';
import config from '../configPublic.json';

/* MODELS
 *************************************/

import StoreProduct from '../store/product';

/* ROUTE
 *************************************/

exports.index = function(req, res) {

    let storeProduct = new StoreProduct(req.app);

    Promise.all([
        storeProduct.store.dispatch(
            storeProduct.getAll({
                isActive: true
            })
        )
    ]).then(() => {
        let products = storeProduct.store.getState();
        let i;
        let items = [];
        for (i = 0; i < products.length; i++) {
            items.push(
`<item>
<g:id><![CDATA[` + products[i].id + `]]></g:id>
<title><![CDATA[` + products[i].title + `]]></title>
<link><![CDATA[` + config.www.origin + '/' + products[i].path + '/' + products[i].seoFilenamePart + '.html' + `]]></link>
<description><![CDATA[` + products[i].description + `]]></description>
<g:image_link><![CDATA[` + config.cdn.origin + '/' + products[i].path + '/' + products[i].seoFilenamePart + '-source.jpg' + `]]></g:image_link>
<g:availability><![CDATA[` + products[i].availability + `]]></g:availability>
<g:price><![CDATA[` + products[i].price + `]]></g:price>
<g:sale_price><![CDATA[` + products[i].salePrice + `]]></g:sale_price>
<g:google_product_category><![CDATA[` + products[i].googleProductCategory + `]]></g:google_product_category>
<g:product_type><![CDATA[` + products[i].productType + `]]></g:product_type>
<g:brand><![CDATA[` + products[i].brand + `]]></g:brand>
<g:color><![CDATA[` + products[i].color + `]]></g:color>
<g:gender><![CDATA[` + products[i].gender + `]]></g:gender>
<g:material><![CDATA[` + products[i].material + `]]></g:material>
<g:pattern><![CDATA[` + products[i].pattern + `]]></g:pattern>
<g:size><![CDATA[` + products[i].size + `]]></g:size>
<g:size_type><![CDATA[` + products[i].sizeType + `]]></g:size_type>
<g:size_system><![CDATA[` + products[i].sizeSystem + `]]></g:size_system>
<g:condition><![CDATA[` + (products[i].condition? products[i].condition : '') + `]]></g:condition>
<g:gtin><![CDATA[` + (products[i].gtin? products[i].gtin : '') + `]]></g:gtin>
<g:mpn><![CDATA[` + products[i].mpn + `]]></g:mpn>
<g:identifier_exists><![CDATA[` + (products[i].identifierExists? 'yes' : 'no') + `]]></g:identifier_exists>
<g:custom_label_0><![CDATA[` + products[i].customLabel0 + `]]></g:custom_label_0>
<g:custom_label_1><![CDATA[` + products[i].customLabel1 + `]]></g:custom_label_1>
<g:custom_label_2><![CDATA[` + products[i].customLabel2 + `]]></g:custom_label_2>
<g:custom_label_3><![CDATA[` + products[i].customLabel3 + `]]></g:custom_label_3>
<g:custom_label_4><![CDATA[` + products[i].customLabel4 + `]]></g:custom_label_4>
<g:multipack><![CDATA[` + (products[i].multipack? products[i].multipack : '') + `]]></g:multipack>
<g:item_group_id><![CDATA[` + products[i].itemGroupID + `]]></g:item_group_id>
<g:is_bundle><![CDATA[` + (products[i].isBundle? 'yes' : 'no') + `]]></g:is_bundle>
<g:age_group><![CDATA[` + products[i].ageGroup + `]]></g:age_group>
</item>`
            )
        }
        res.header(configPrivate.header.xml);
        res.send(
`<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
<title><![CDATA[` + config.name + `]]></title>
<link><![CDATA[` + config.www.origin + `]]></link>
<description><![CDATA[` + config.description + `]]></description>
` + items.join(
`
`
) + `
</channel>
</rss>`
        );

    });

};
