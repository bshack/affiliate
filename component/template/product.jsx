import React from 'react';
import numeral from 'numeral';
import UtilityJSONLD from '../../utility/jsonLD';
import Picture from './picture.jsx';
import LazyLoad from 'react-lazy-load';

const utilityJSONLD = new UtilityJSONLD();

class View extends React.PureComponent {

    render() {
        let image = '';
        if (this.props.product.isImageLinkProcessed) {
            image =
                <div className='image'>
                    <a href={'/' + this.props.product.path + '/' + this.props.product.seoFilenamePart + '.html'}>
                        {
                            this.props.isLazy?
                                <LazyLoad offset={1000} debounce={false} throttle={250}>
                                    <Picture
                                        data={this.props.product}
                                        small={this.props.product.path + '/' + this.props.product.seoFilenamePart
                                            + '-medium'}
                                        medium={this.props.product.path + '/' + this.props.product.seoFilenamePart
                                            + '-medium'}
                                        large={this.props.product.path + '/' + this.props.product.seoFilenamePart
                                            + '-medium'}
                                        xlarge={this.props.product.path + '/' + this.props.product.seoFilenamePart
                                            + '-medium'}
                                        xxlarge={this.props.product.path + '/' + this.props.product.seoFilenamePart
                                            + '-medium'}
                                    />
                                </LazyLoad>
                                :
                                <Picture
                                    data={this.props.product}
                                    small={this.props.product.path + '/' + this.props.product.seoFilenamePart
                                        + '-medium'}
                                    medium={this.props.product.path + '/' + this.props.product.seoFilenamePart
                                        + '-medium'}
                                    large={this.props.product.path + '/' + this.props.product.seoFilenamePart
                                        + '-medium'}
                                    xlarge={this.props.product.path + '/' + this.props.product.seoFilenamePart
                                        + '-medium'}
                                    xxlarge={this.props.product.path + '/' + this.props.product.seoFilenamePart
                                        + '-medium'}
                                />
                        }
                    </a>
                </div>
        }

        let price = '';
        if (this.props.product.salePriceUnformatted &&
            (this.props.product.salePriceUnformatted !== this.props.product.priceUnformatted) &&
            (this.props.product.salePriceUnformatted < this.props.product.priceUnformatted)
        ) {
            price = <p className='price-sale'><del>{numeral(this.props.product.priceUnformatted)
                .format('$0,0[.]00')}</del> <span>{numeral(this.props.product.salePriceUnformatted)
                .format('$0,0[.]00')}</span></p>
        } else {
            price = <p className='price'><span>{numeral(this.props.product.priceUnformatted)
                .format('$0,0[.]00')}</span></p>
        }

        let storeName = '';
        if (this.props.product.storeName !== '') {
            storeName = <p className='store'><span>sold by</span> <a href={'/store/'
                + this.props.product.programName + '/index.html'}>{this.props.product.storeName}</a></p>
        }

        let productCondition = '';
        if (this.props.product.productCondition !== '' && this.props.product.productCondition !== 'new') {
            productCondition = <p class="condition">{this.props.product.productCondition}</p>
        }

        return (
            this.props.isLazy?
                <div className='product'>
                    {image}
                    <div className='detail'>
                        <h3>
                            <a href={'/' + this.props.product.path + '/'
                            + this.props.product.seoFilenamePart + '.html'}>{this.props.product.title}</a>
                        </h3>
                        {storeName}
                        {productCondition}
                        {price}
                    </div>
                    <div className='cta'>
                        <a className='anchor-2' href={this.props.product.link}>get deal now</a>
                    </div>
                    {utilityJSONLD.product(this.props.product, this.props.config)}
                </div>
                :
                <div className='product'>
                    {image}
                    <div className='detail'>
                        <h3>
                            <a href={'/' + this.props.product.path + '/'
                            + this.props.product.seoFilenamePart + '.html'}>{this.props.product.title}</a>
                        </h3>
                        {storeName}
                        {productCondition}
                    </div>
                    {price}
                    <div className='cta'>
                        <a className='anchor-2' href={this.props.product.link}>get deal now</a>
                    </div>
                    {utilityJSONLD.product(this.props.product, this.props.config)}
                </div>
        );
    }
}

export default View;
