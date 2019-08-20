import React from 'react';
import Picture from './picture.jsx';
import ProductImages from './productImages.jsx';
import numeral from 'numeral';
import UtilityJSONLD from '../../utility/jsonLD';
import {connect} from 'react-redux';

const utilityJSONLD = new UtilityJSONLD();

class View extends React.PureComponent {

    render() {

        let image;
        if (this.props.data.isAdditionalImageLinkProcessed) {
            image = <ProductImages data={this.props.data} />;
        } else {
            image =
            <div className="image">
                <Picture
                    data={this.props.data}
                    small={this.props.data.path + '/' + this.props.data.seoFilenamePart
                        + '-large'}
                    medium={this.props.data.path + '/' + this.props.data.seoFilenamePart
                        + '-large'}
                    large={this.props.data.path + '/' + this.props.data.seoFilenamePart
                        + '-large'}
                    xlarge={this.props.data.path + '/' + this.props.data.seoFilenamePart
                        + '-large'}
                    xxlarge={this.props.data.path + '/' + this.props.data.seoFilenamePart
                        + '-large'}
                />
            </div>;
        }

        let availability = '';
        if (this.props.data.availability !== '') {
            availability = <span className="availability">{this.props.data.availability}</span>
        }

        let price = '';
        if (this.props.data.salePriceUnformatted &&
            (this.props.data.salePriceUnformatted !== this.props.data.priceUnformatted) &&
            (this.props.data.salePriceUnformatted < this.props.data.priceUnformatted)
        ) {
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

        let storeName = '';
        if (this.props.data.storeName !== '') {
            storeName = <p className="program"><span>sold by</span> <a href={'/store/' +
                    this.props.data.programName + '/index.html'}>{this.props.data.storeName}</a>
            </p>
        }

        let gtin = '';
        if (this.props.data.gtin) {
            gtin = <div className="col-6 gtin">
                <strong>gtin</strong>
                <p>{this.props.data.gtin}</p>
            </div>;
        }

        let mpn = '';
        if (this.props.data.mpn !== '') {
            mpn = <div className="col-6 mpn">
                <strong>mpn</strong>
                <p>{this.props.data.mpn}</p>
            </div>;
        }

        let description = '';
        if (this.props.data.description !== '') {
            description = <div className="description">
                <strong>description</strong>
                <p>{this.props.data.description}</p>
            </div>;
        }

        let productCondition = '';
        if (this.props.data.productCondition !== '' && this.props.data.productCondition !== 'new') {
            productCondition = <div className="col-6 condition">
                <strong>condition</strong>
                <p>{this.props.data.productCondition}</p>
            </div>;
        }

        let brand = '';
        if (this.props.data.brand !== '') {
            brand = <div className="col-6 brand">
                <strong>brand</strong>
                <p><a href={'/brand/' + this.props.data.brand + '/index.html'}>{this.props.data.brandName}</a></p>
            </div>;
        }

        let category = '';
        if (this.props.data.categoryTitle !== '') {
            category = <div className="col-6 category">
                <strong>category</strong>
                <p><a href={'/' + this.props.data.path + '/index.html'}>{this.props.data.categoryTitle}</a></p>
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
                        {storeName}
                        {price}
                        {
                            (this.props.data.availability === 'in stock') ?
                                <a className="anchor-2" href={this.props.data.link}>get deal now</a>
                                : null
                        }
                        <div className="specifications row">
                            {productCondition}
                            {brand}
                            {category}
                            {gtin}
                            {mpn}
                            <div className="col-6 sku">
                                <strong>sku</strong>
                                <p>{this.props.data.id}</p>
                            </div>
                        </div>
                        {description}
                    </aside>
                </div>
                {utilityJSONLD.product(this.props.data)}
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data.product[0]
    }
}

export default connect(
    mapStateToProps
)(View);
