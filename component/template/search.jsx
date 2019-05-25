import React from 'react';
import {connect} from 'react-redux';
import {loadSearchResults} from '../../action/search';

class View extends React.Component {
    search(e) {
        e.preventDefault();
        if (e.target.value.length > 1) {
            this.props.loadSearchResults({
                q: e.target.value
            });
        }
    }
    render() {
        console.log('render', this.props);
        return (
            <fieldset className="search">
                <label htmlFor="brand-store-search">search</label>
                <input id="brand-store-search" type="search" placeholder="search" onInput={this.search.bind(this)} />
                <button type="submit">search</button>
            </fieldset>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        config: state.config,
        data: state.data
    }
}

const mapDispatchToProps = {
    loadSearchResults
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
