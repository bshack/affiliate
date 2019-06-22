import React from 'react';
import {connect} from 'react-redux';
import {queryBrandsStores} from '../../action/search';
import config from '../../configPublic';

class View extends React.PureComponent {

    componentDidMount() {
        if (typeof Image === 'function') {
            new Image().src = config.www.origin + '/' + config.static.version + '/image/loader.svg';
        }
    }

    searchResults() {
        let brandRows = [];
        let brandIndex;
        for (brandIndex = 0; brandIndex < this.props.state.data.brands.length; brandIndex++) {
            brandRows.push(
                <li key={brandIndex}>
                    <a
                        href={'/brand/' + this.props.state.data.brands[brandIndex].brand + '/index.html'}
                    >{this.props.state.data.brands[brandIndex].brand}</a>
                </li>
            );
        }

        let storeRows = [];
        let storeIndex;
        for (storeIndex = 0; storeIndex < this.props.state.data.programs.length; storeIndex++) {
            storeRows.push(
                <li key={storeIndex}>
                    <a
                        href={'/store/' + this.props.state.data.programs[storeIndex].programName + '/index.html'}
                    >{this.props.state.data.programs[storeIndex].programName}</a>
                </li>
            );
        }

        let productRows = [];
        let productIndex;
        for (productIndex = 0; productIndex < this.props.state.data.products.length; productIndex++) {
            productRows.push(
                <li key={productIndex}>
                    <a
                        href={'/' + this.props.state.data.products[productIndex].path +
                            '/' + this.props.state.data.products[productIndex].seoFilenamePart + '.html'}
                    >{this.props.state.data.products[productIndex].title}</a></li>);
        }

        if (this.props.state.data.query !== '' && !brandRows.length && !storeRows.length && !productRows.length) {
            return <div className="results-empty">
                <p>No results found for <strong>&quot;{this.props.state.data.query}&quot;</strong>.</p>
            </div>;
        } else if (!brandRows.length && !storeRows.length && !productRows.length) {
            return <div className="results"></div>;
        } else {
            return <div className="results">
                {brandRows.length?
                    <div className="brands">
                        <strong>brands</strong>
                        <ul>
                            {brandRows}
                        </ul>
                    </div> : null
                }
                {storeRows.length?
                    <div className="stores">
                        <strong>stores</strong>
                        <ul>
                            {storeRows}
                        </ul>
                    </div> : null
                }
                {productRows.length?
                    <div className="products">
                        <strong>products</strong>
                        <ul>
                            {productRows}
                        </ul>
                    </div> : null
                }
            </div>;
        }

    }
    onInputSearch(e) {
        e.preventDefault();
        this.props.queryBrandsStores({
            q: e.target.value
        });
    }
    onSubmitSearch(e) {
        e.preventDefault();
        this.props.queryBrandsStores({
            q: e.target.querySelector('#brand-store-search').value
        });
    }
    render() {
        return (
            <form
                onSubmit={this.onSubmitSearch.bind(this)}
                className={'form-search' + (this.props.state.isLoading? ' loading' : '')}
            >
                <fieldset>
                    <label
                        htmlFor="brand-store-search"
                        className="accessibility-hidden-element"
                    >search for brands, stores &amp; products</label>
                    <input
                        id="site-search-q"
                        name="site-search-q"
                        type="search"
                        placeholder="search for brands, stores &amp; products"
                        onInput={this.onInputSearch.bind(this)}
                    />
                    <button type="submit" className="accessibility-hidden-element">search</button>
                    {this.searchResults(this.props.state.data)}
                </fieldset>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = {
    queryBrandsStores
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
