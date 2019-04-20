const React = require('react');
const Picture = require('./picture.jsx');
const numeral = require('numeral');
const UtilityJSONLD = require('../utility/jsonLD');

const utilityJSONLD = new UtilityJSONLD();

class View extends React.Component {

  render() {

    let image;
    if (this.props.data.isAdditionalImageLinkProcessed) {
        image =
            <div className="images row no-gutters">
                <ul role="tablist" className="col-2">
                    <li key="main" id="tab-1" role="tab" aria-controls="panel-1" aria-selected="true" tabIndex="0">
                        <div className="image">
                            <Picture data={this.props.data} configPublic={this.props.configPublic} />
                        </div>
                    </li>
                    <li key="additional" id="tab-2" role="tab" aria-controls="panel-2" aria-selected="false" tabIndex="-1">
                        <div className="image">
                            <Picture data={this.props.data} configPublic={this.props.configPublic} slug="additional" />
                        </div>
                    </li>
                </ul>
                <div  id="panel-1" aria-labelledby="tab-1" role="tabpanel" aria-hidden="false" className="col-10">
                    <div className="image">
                        <Picture data={this.props.data} configPublic={this.props.configPublic} />
                    </div>
                </div>
                <div id="panel-2" aria-labelledby="tab-2" role="tabpanel" aria-hidden="true" className="col-10">
                    <div className="image">
                        <Picture data={this.props.data} configPublic={this.props.configPublic} slug="additional" />
                    </div>
                </div>
            </div>;
    } else {
        image =
            <div className="image">
                <Picture data={this.props.data} configPublic={this.props.configPublic} />
            </div>;
    }

    let price = '';
    if (this.props.data.salePriceUnformatted) {
        price = <p className="price-sale"><del>{numeral(this.props.data.priceUnformatted).format('$0,0[.]00')}</del> {numeral(this.props.data.salePriceUnformatted).format('$0,0.00')} <span>{this.props.data.salePriceCurrency}</span></p>
    } else {
        price = <p className="price">{numeral(this.props.data.priceUnformatted).format('$0,0[.]00')} <span>{this.props.data.priceCurrency}</span></p>
    }

    let programName = '';
    if (this.props.data.programName !== '') {
        programName = <p className="program">from <a href={'/store/' + this.props.data.programName + '/index.html'}>{this.props.data.programName}</a></p>
    }

    let availability = '';
    if (this.props.data.availability !== '') {
        availability = <p className="availability">{this.props.data.availability}</p>
    }

    let gtin = '';
    if (this.props.data.gtin) {
        gtin = <p className="gtin">gtin: {this.props.data.gtin}</p>
    }

    let mpn = '';
    if (this.props.data.mpn !== '') {
        mpn = <p className="mpn">mpn: {this.props.data.mpn}</p>
    }

    let productCondition = '';
    if (this.props.data.productCondition !== '' && this.props.data.productCondition !== 'new') {
        productCondition = <p className="condition">{this.props.data.productCondition}</p>
    }

    let description = '';
    if (this.props.data.description !== '') {
        description = <p className="description">{this.props.data.description}</p>
    }

    let brand = '';
    if (this.props.data.brand !== '') {
        brand = <p className="brand"><a href={'/brand/' + this.props.data.brand + '/index.html'}>{this.props.data.brand}</a></p>
    }

    return (
      <section className="product-detail container">
        <div className="row">
            <div className="col-12 col-md-8">
                {image}
            </div>
            <aside className="col-12 col-md-4">
                <h1>
                    {this.props.data.title}
                </h1>
                {programName}
                {price}
                {availability}
                {productCondition}
                <a className="anchor-1" href={this.props.data.link}>get deal now</a>
                {brand}
                {description}
                {gtin}
                {mpn}
            </aside>
        </div>
        {utilityJSONLD.product(this.props.data, this.props.configPublic)}
      </section>
    );
  }
}

module.exports = View;
