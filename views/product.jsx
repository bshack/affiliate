const React = require('react');
const Picture = require('./picture.jsx');
const numeral = require('numeral');
const UtilityJSONLD = require('../utilities/jsonLD');

var utilityJSONLD = new UtilityJSONLD();

class View extends React.Component {

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
        {utilityJSONLD.product(this.props.data)}
      </div>
    );
  }
}

module.exports = View;
