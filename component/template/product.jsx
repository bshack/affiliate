import React from 'react';
import numeral from 'numeral';
import UtilityJSONLD from '../../utility/jsonLD';
import Picture from './picture.jsx';
import LazyLoad from 'react-lazy-load';

const utilityJSONLD = new UtilityJSONLD();

class View extends React.PureComponent {

    render() {
        let image = '';
        if (this.props.data.isImageLinkProcessed) {
            image =
                <div className='image'>
                    <a href={'/' + this.props.data.path + '/' + this.props.data.seoFilenamePart + '.html'}>
                        {
                            this.props.isLazy?
                                <LazyLoad offset={1000} debounce={false} throttle={250}>
                                    <Picture data={this.props.data} config={this.props.config} />
                                </LazyLoad>
                                :
                                <Picture data={this.props.data} config={this.props.config} />
                        }
                    </a>
                </div>
        }

        let price = '';
        if (this.props.data.salePriceUnformatted) {
            price = <p className='price-sale'><del>{numeral(this.props.data.priceUnformatted)
                .format('$0,0[.]00')}</del> <span>{numeral(this.props.data.salePriceUnformatted)
                .format('$0,0[.]00')}</span></p>
        } else {
            price = <p className='price'><span>{numeral(this.props.data.priceUnformatted)
                .format('$0,0[.]00')}</span></p>
        }

        let programName = '';
        if (this.props.data.programName !== '') {
            programName = <p className='program'><span>sold by</span> <a href={'/store/'
                + this.props.data.programName + '/index.html'}>{this.props.data.programName}</a></p>
        }

        let productCondition = '';
        if (this.props.data.productCondition !== '' && this.props.data.productCondition !== 'new') {
            productCondition = <p class="condition">{this.props.data.productCondition}</p>
        }

        return (
            this.props.isLazy?
                <div className='product'>
                    {image}
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
                        <a className='anchor-2' href={this.props.data.link}>get deal now</a>
                    </div>
                    {utilityJSONLD.product(this.props.data, this.props.config)}
                </div>
                :
                <div className='product'>
                    {image}
                    <div className='detail'>
                        <h3>
                            <a href={'/' + this.props.data.path + '/'
                            + this.props.data.seoFilenamePart + '.html'}>{this.props.data.title}</a>
                        </h3>
                        {programName}
                        {productCondition}
                    </div>
                    {price}
                    <div className='cta'>
                        <a className='anchor-2' href={this.props.data.link}>get deal now</a>
                    </div>
                    {utilityJSONLD.product(this.props.data, this.props.config)}
                </div>
        );
    }
}

export default View;
