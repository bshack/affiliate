import React from 'react';
import {connect} from 'react-redux';
import config from '../../configPublic';
import Search from './search.jsx';
import StoreSearch from '../../store/page/search';
import {Provider} from 'react-redux';
import _ from 'lodash';

const storeSearch = new StoreSearch(config);

class View extends React.PureComponent {
    openMainMenu(e) {
        e.preventDefault();
        if (this.props.state.data.isMainMenuOpen) {
            this.props.state.data.isMainMenuOpen = false;
        } else {
            this.props.state.data.isMainMenuOpen = true;
        }
        this.props.dispatch({
            type: 'GET_DATA',
            data: _.extend({}, this.props.state)
        });
    }
    
    openSearchMenu(e) {
        e.preventDefault();
        if (this.props.state.data.isSearchMenuOpen) {
            this.props.state.data.isSearchMenuOpen = false;
        } else {
            this.props.state.data.isSearchMenuOpen = true;
        }
        this.props.dispatch({
            type: 'GET_DATA',
            data: _.extend({}, this.props.state)
        });
    }

    render() {
        return (
            <header>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <button className={'hamburger hamburger--squeeze' +
                                (this.props.state.data.isMainMenuOpen? ' is-active' : '')} type="button"
                            onClick={this.openMainMenu.bind(this)}>
                                <span className="hamburger-box">
                                    <span className="hamburger-inner"></span>
                                </span>
                            </button>
                            {config.name}
                            <button className={'search' +
                                (this.props.state.data.isSearchMenuOpen? ' open' : '')} type="button"
                            onClick={this.openSearchMenu.bind(this)}>
                                search
                            </button>
                        </div>
                        <Provider store={storeSearch.store}>
                            <Search />
                        </Provider>
                        <div className="col-1" />
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect(
    mapStateToProps
)(View);
