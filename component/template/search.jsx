import React from 'react';
import {connect} from 'react-redux';
import {queryBrandsStores} from '../../action/search';

class View extends React.PureComponent {
    searchResults(data) {

        let brandRows = [];
        let brandIndex;
        for (brandIndex = 0; brandIndex < data.brands.length; brandIndex++) {
            brandRows.push(<li key={brandIndex}>{data.brands[brandIndex].brand}</li>);
        }

        let storeRows = [];
        let storeIndex;
        for (storeIndex = 0; storeIndex < data.programs.length; storeIndex++) {
            storeRows.push(<li key={storeIndex}>{data.programs[storeIndex].programName}</li>);
        }

        if (!brandRows.length && !storeRows.length) {
            return null;
        } else {
            return <div className="results">
                {brandRows.length?
                    <div className="brands">
                        <span>Brands</span>
                        <ul>
                            {brandRows}
                        </ul>
                    </div> : null
                }
                {storeRows.length?
                    <div className="stores">
                        <span>Stores</span>
                        <ul>
                            {storeRows}
                        </ul>
                    </div> : null
                }
            </div>;
        }

    }
    search(e) {
        e.preventDefault();
        this.props.queryBrandsStores({
            q: e.target.value
        });
    }
    render() {
        return (
            <fieldset className={'navigation-search' + (this.props.state.data.isSearchMenuOpen? ' open' : '' )}>
                <label htmlFor="brand-store-search">search</label>
                <input id="brand-store-search" type="search" placeholder="search" onInput={this.search.bind(this)} />
                <button type="submit">search</button>
                {this.searchResults(this.props.state.data)}
            </fieldset>
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
