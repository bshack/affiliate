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
                    >{this.props.state.data.brands[brandIndex].brandName}</a>
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
                    >{this.props.state.data.programs[storeIndex].storeName}</a>
                </li>
            );
        }

        let categoryRows = [];
        let categoryIndex;
        for (categoryIndex = 0; categoryIndex < this.props.state.data.categories.length; categoryIndex++) {
            categoryRows.push(
                <li key={categoryIndex}>
                    <a
                        href={'/' + this.props.state.data.categories[categoryIndex].path + '/index.html'}
                    >{this.props.state.data.categories[categoryIndex].title}</a>
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

        if (this.props.state.data.query !== '' && !categoryRows.length
            && !brandRows.length && !storeRows.length && !productRows.length) {
            return <div className="col-12 results-empty">
                <p>No results found for <strong>&quot;{this.props.state.data.query}&quot;</strong>.</p>
            </div>;
        } else if (this.props.state.data.query === '') {
            return <div className="col-12 results-initial">
                <p>Please enter a search query.</p>
            </div>;
        } else {
            return <div className="col-12 results">
                {categoryRows.length?
                    <div className="categories">
                        <strong>categories</strong>
                        <ul>
                            {categoryRows}
                        </ul>
                    </div> : null
                }
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
                noValidate
                onSubmit={this.onSubmitSearch.bind(this)}
                className={'row form-search' +
                    (this.props.state.isLoading? ' loading' : '') +
                    ((this.props.state.data.query !== '')? ' has-query' : '')
                }
            >
                <fieldset className="col-12">
                    <label
                        htmlFor="brand-store-search"
                        className="accessibility-hidden-element"
                    >search for brands, stores &amp; products</label>
                    <input
                        id="site-search-q"
                        name="site-search-q"
                        type="search"
                        placeholder="search brands, stores &amp; more"
                        onInput={this.onInputSearch.bind(this)}
                    />
                    <button type="submit" className="accessibility-hidden-element">search</button>
                </fieldset>
                {this.searchResults(this.props.state.data)}
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
