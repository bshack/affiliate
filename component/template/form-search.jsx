import React from 'react';
import {connect} from 'react-redux';
import {queryBrandsStores} from '../../action/search';

class View extends React.PureComponent {
    searchResults(data) {

        let brandRows = [];
        let brandIndex;
        for (brandIndex = 0; brandIndex < data.brands.length; brandIndex++) {
            brandRows.push(<li key={brandIndex}><a href="/">{data.brands[brandIndex].brand}</a></li>);
        }

        let storeRows = [];
        let storeIndex;
        for (storeIndex = 0; storeIndex < data.programs.length; storeIndex++) {
            storeRows.push(<li key={storeIndex}><a href="/">{data.programs[storeIndex].programName}</a></li>);
        }

        let productRows = [];
        let productIndex;
        for (productIndex = 0; productIndex < data.products.length; productIndex++) {
            productRows.push(<li key={productIndex}><a href="/">{data.products[productIndex].title}</a></li>);
        }

        if (!brandRows.length && !storeRows.length && !productRows.length) {
            return null;
        } else {
            return <div className="results">
                {brandRows.length?
                    <div className="brands">
                        <strong>Brands</strong>
                        <ul>
                            {brandRows}
                        </ul>
                    </div> : null
                }
                {storeRows.length?
                    <div className="stores">
                        <strong>Stores</strong>
                        <ul>
                            {storeRows}
                        </ul>
                    </div> : null
                }
                {productRows.length?
                    <div className="products">
                        <strong>Products</strong>
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
                className="form-search"
                onSubmit={this.onSubmitSearch.bind(this)}
            >
                <fieldset>
                    <label htmlFor="brand-store-search" className="accessibility-hidden-element">search for ba</label>
                    <input
                        id="brand-store-search"
                        type="search"
                        placeholder="search brands, stores &amp; products"
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
