import React from 'react';
import Picture from './picture.jsx';
import numeral from 'numeral';
import UtilityJSONLD from '../../utility/jsonLD';
import {connect} from 'react-redux';

const utilityJSONLD = new UtilityJSONLD();

class View extends React.PureComponent {

    render() {

        let image;
        if (this.props.data.isAdditionalImageLinkProcessed) {
            image =
            <div className="images row no-gutters">
                <ul role="tablist" className="col-2">
                    <li key="main" id="tab-1" role="tab" aria-controls="panel-1" aria-selected="true" tabIndex="0">
                        <div className="image">
                            <Picture data={this.props.data} config={this.props.config} />
                        </div>
                    </li>
                    <li key="additional" id="tab-2" role="tab" aria-controls="panel-2"
                        aria-selected="false" tabIndex="-1">
                        <div className="image">
                            <Picture data={this.props.data} config={this.props.config} slug="additional" />
                        </div>
                    </li>
                </ul>
                <div  id="panel-1" aria-labelledby="tab-1" role="tabpanel" aria-hidden="false" className="col-10">
                    <div className="image">
                        <Picture data={this.props.data} config={this.props.config} />
                    </div>
                </div>
                <div id="panel-2" aria-labelledby="tab-2" role="tabpanel" aria-hidden="true" className="col-10">
                    <div className="image">
                        <Picture data={this.props.data} config={this.props.config} slug="additional" />
                    </div>
                </div>
            </div>;
        } else {
            image =
            <div className="image">
                <Picture data={this.props.data} config={this.props.config} />
            </div>;
        }

        let availability = '';
        if (this.props.data.availability !== '') {
            availability = <span className="availability">{this.props.data.availability}</span>
        }

        let price = '';
        if (this.props.data.salePriceUnformatted) {
            price = <p className="price-sale">
                <del>{numeral(this.props.data.priceUnformatted).format('$0,0[.]00')}</del> <span>
                    {numeral(this.props.data.salePriceUnformatted).format('$0,0[.]00')}
                </span> {availability}
            </p>
        } else {
            price = <p className="price">
                <span>{numeral(this.props.data.priceUnformatted).format('$0,0[.]00')}
                </span> {availability}
            </p>
        }

        let programName = '';
        if (this.props.data.programName !== '') {
            programName = <p className="program"><span>sold by</span> <a href={'/store/' +
                    this.props.data.programName + '/index.html'}>{this.props.data.programName}</a>
            </p>
        }

        let gtin = '';
        if (this.props.data.gtin) {
            gtin = <div className="gtin">
                <strong>gtin</strong>
                <p>{this.props.data.gtin}</p>
            </div>;
        }

        let mpn = '';
        if (this.props.data.mpn !== '') {
            mpn = <div className="mpn">
                <strong>mpn</strong>
                <p>{this.props.data.mpn}</p>
            </div>;
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
            brand = <div className="brand">
                <strong>brand</strong>
                <p><a href={'/brand/' + this.props.data.brand + '/index.html'}>{this.props.data.brand}</a></p>
            </div>;
        }

        return (
            <section className="product-detail container">
                <div className="row">
                    <div className="col-12 col-md-7">
                        {image}
                    </div>
                    <aside className="col-12 col-md-5">
                        <h1>
                            {this.props.data.title}
                        </h1>
                        {programName}
                        {price}
                        {productCondition}
                        <a className="anchor-2" href={this.props.data.link}>get deal now</a>
                        {description}
                        {brand}
                        {gtin}
                        {mpn}
                    </aside>
                </div>
                {utilityJSONLD.product(this.props.data, this.props.config)}
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data.product[0],
        config: state.data.config
    }
}

export default connect(
    mapStateToProps
)(View);
