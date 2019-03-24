const React = require('react');
const Picture = require('./picture.jsx');
const numeral = require('numeral');
const moment = require('moment');
const _ = require('lodash');

class View extends React.Component {


    jsonLDData(data) {

        let cdn = "https://s3.us-east-2.amazonaws.com/cdn.shackelforddigital.io/";

        let defaultObject = {
          "@context": "http://schema.org/",
          "@type": "Product",
          "brand": {
            "@type": "Thing"
          },
          "offers": {
            "@type": "Offer",
            "seller": {
              "@type": "Organization"
            }
          }
      };

      let productData = {
          brand: {},
          offers: {
              seller: {},
              availability: {}
          }
      };

      if (this.props.data.seoDirectoryNamePart && this.props.data.seoFilenamePart) {
          productData.url = (cdn + this.props.data.seoDirectoryNamePart + '/' + this.props.data.seoFilenamePart + ".html");
          productData.offers.url = productData.url;
      }
      if (this.props.data.title !== '') {
          productData.name = this.props.data.title;
      }
      if (this.props.data.seoDirectoryNamePart && this.props.data.seoFilenamePart && this.props.data.isImageLinkProcessed) {
          productData.image = (cdn + this.props.data.seoDirectoryNamePart + '/' + this.props.data.seoFilenamePart + "-large@2x.jpg");
      }
      if (this.props.data.description !== '') {
          productData.description = this.props.data.description;
      }
      if (this.props.data.googleProductCategoryName !== '') {
          productData.category = this.props.data.googleProductCategoryName;
      }
      if (this.props.data.color !== '') {
          productData.color = this.props.data.color;
      }
      if (this.props.data.material !== '') {
          productData.material = this.props.data.material;
      }
      if (this.props.data.mpn !== '') {
          productData.mpn = this.props.data.mpn;
      }
      if (this.props.data.brand !== '') {
          productData.brand.name = this.props.data.brand;
      }
      if (this.props.data.programName !== '') {
          productData.offers.seller.name = this.props.data.programName;
      }
      if (this.props.data.availability === 'in stock') {
          productData.offers.availability = "http://schema.org/InStock";
      } else if (this.props.data.availability === 'out of stock') {
          productData.offers.availability = "http://schema.org/OutOfStock";
      } else if (this.props.data.availability === 'preorder') {
          productData.offers.availability = "http://schema.org/PreOrder";
      }

      if (this.props.data.productCondition === 'new') {
          productData.offers.itemCondition = "http://schema.org/NewCondition";
      } else if (this.props.data.productCondition === 'refurbished') {
          productData.offers.itemCondition = "http://schema.org/RefurbishedCondition";
      } else if (this.props.data.productCondition === 'used') {
          productData.offers.itemCondition = "http://schema.org/UsedCondition";
      }
      if (this.props.data.salePriceCurrency) {
          productData.offers.priceCurrency = this.props.data.salePriceCurrency;
      } else if (this.props.data.priceCurrency) {
          productData.offers.priceCurrency = this.props.data.priceCurrency;
      }
      if (this.props.data.salePriceUnformatted) {
          productData.offers.price = this.props.data.salePriceUnformatted;
      } else if (this.props.data.priceUnformatted) {
          productData.offers.price = this.props.data.priceUnformatted;
      }

      if (this.props.data.expirationDate) {
          productData.offers.priceValidUntil = moment(this.props.data.expirationDate).toISOString();
      }

      if (this.props.data.gtin) {
          let gtinLength = this.props.data.gtin.toString().length;
          if (gtinLength === 8) {
              productData.gtin8 = this.props.data.gtin;
          } else if (gtinLength === 12) {
              productData.gtin12 = this.props.data.gtin;
          } else if (gtinLength === 13) {
              productData.gtin13 = this.props.data.gtin;
          } else if (gtinLength === 14) {
              productData.gtin13 = this.props.data.gtin;
          }
      }

     return _.extend({}, defaultObject, productData);
    }



  render() {

    let image = '';
    if (this.props.data.isImageLinkProcessed) {
        image = <Picture data={this.props.data} />
    }

    let imageAdditional = '';
    if (this.props.data.isAdditionalImageLinkProcessed) {
        imageAdditional = <Picture data={this.props.data} slug="additional" />
    }

    let price = '';
    if (this.props.data.salePriceUnformatted) {
        price = <p className="price"><del>{numeral(this.props.data.priceUnformatted).format('$0,0[.]00')} <span>{this.props.data.priceCurrency}</span></del> {numeral(this.props.data.salePriceUnformatted).format('$0,0.00')} <span>{this.props.data.salePriceCurrency}</span></p>
    } else {
        price = <p className="price">{numeral(this.props.data.priceUnformatted).format('$0,0[.]00')} <span>{this.props.data.priceCurrency}</span></p>
    }

    let brand = '';
    if (this.props.data.brand !== '') {
        brand = <p>{this.props.data.brand}</p>
    }

    let gtin = '';
    if (this.props.data.gtin) {
        gtin = <p>{this.props.data.gtin}</p>
    }

    let mpn = '';
    if (this.props.data.mpn !== '') {
        mpn = <p>{this.props.data.mpn}</p>
    }

    let productCondition = '';
    if (this.props.data.productCondition !== '') {
        productCondition = <p>{this.props.data.productCondition}</p>
    }

    let availability = '';
    if (this.props.data.availability !== '') {
        availability = <p>{this.props.data.availability}</p>
    }

    return (
      <div className="product col-3">
        {image}
        {imageAdditional}
        <h2>{this.props.data.title}</h2>
        {availability}
        {brand}
        {gtin}
        {mpn}
        {price}
        {productCondition}
        <a href={this.props.data.link}>get the deal now</a>
        <br />
        <a href={"/" + this.props.data.seoDirectoryNamePart + '/' + this.props.data.seoFilenamePart + ".html"}>offer details</a>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(this.jsonLDData(this.props.data)) }}
        />
      </div>
    );
  }
}

module.exports = View;
