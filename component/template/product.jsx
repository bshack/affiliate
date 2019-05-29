import React from 'react';
import numeral from 'numeral';
import UtilityJSONLD from '../../utility/jsonLD';
import Picture from './picture.jsx';
import LazyLoad from 'react-lazy-load';

const utilityJSONLD = new UtilityJSONLD();

class View extends React.Component {

    render() {
        let image = '';
        if (this.props.data.isImageLinkProcessed) {
            image =
                <div className='image'>
                    <a href={'/' + this.props.data.path + '/' + this.props.data.seoFilenamePart + '.html'}>
                        {
                            this.props.isLazy?
                                <LazyLoad offset={1000}>
                                    <Picture data={this.props.data} config={this.props.config} />
                                </LazyLoad>
                                :
                                <Picture data={this.props.data} config={this.props.config} />
                        }
                    </a>
                </div>
        }

        let imageAdditional = '';
        if (this.props.data.isAdditionalImageLinkProcessed) {
            imageAdditional =
                <div className='image'>
                    <a href={'/' + this.props.data.path + '/' + this.props.data.seoFilenamePart + '.html'}>
                        {
                            this.props.isLazy?
                                <LazyLoad offset={400}>
                                    <Picture data={this.props.data} slug='additional' />
                                </LazyLoad>
                                :
                                <Picture data={this.props.data} slug='additional' />
                        }
                    </a>
                </div>
        }

        let price = '';
        if (this.props.data.salePriceUnformatted) {
            price = <p className='price-sale'><del>{numeral(this.props.data.priceUnformatted)
                .format('$0,0[.]00')}</del> <span>{numeral(this.props.data.salePriceUnformatted)
                .format('$0,0.00')}</span> <span>{this.props.data.salePriceCurrency}</span></p>
        } else {
            price = <p className='price'><span>{numeral(this.props.data.priceUnformatted)
                .format('$0,0[.]00')}</span> <span>{this.props.data.priceCurrency}</span></p>
        }

        let programName = '';
        if (this.props.data.programName !== '') {
            programName = <p className='program'>from <a href={'/store/'
                + this.props.data.programName + '/index.html'}>{this.props.data.programName}</a></p>
        }

        let availability = '';
        if (this.props.data.availability !== '') {
            availability = <p>{this.props.data.availability}</p>
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
        if (this.props.data.productCondition !== '' && this.props.data.productCondition !== 'new') {
            productCondition = <p>{this.props.data.productCondition}</p>
        }

        return (
            this.props.isLazy?
                <div className='product'>
                    {image}
                    {imageAdditional}
                    <div className='detail'>
                        <h3>
                            <a href={'/' + this.props.data.path + '/'
                            + this.props.data.seoFilenamePart + '.html'}>{this.props.data.title}</a>
                        </h3>
                        {programName}
                        {productCondition}
                        {price}
                    </div>
                    <div className='cta'>
                        <a className='anchor-1' href={this.props.data.link}>get deal now</a>
                    </div>
                    {utilityJSONLD.product(this.props.data, this.props.config)}
                </div>
                :
                <div className='product'>
                    {image}
                    {imageAdditional}
                    <div className='detail'>
                        <h3>
                            <a href={'/' + this.props.data.path + '/'
                            + this.props.data.seoFilenamePart + '.html'}>{this.props.data.title}</a>
                        </h3>
                        {programName}
                        {productCondition}
                        {price}
                    </div>
                    <div className='cta'>
                        <a className='anchor-1' href={this.props.data.link}>get deal now</a>
                    </div>
                    {utilityJSONLD.product(this.props.data, this.props.config)}
                </div>
        );
    }
}

export default View;
