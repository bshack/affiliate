import React from 'react';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';
import Search from './search.jsx';
import StoreSearch from '../../store/page/search';
import config from '../../configPublic';

const storeSearch = new StoreSearch(config);

class View extends React.PureComponent {

    render() {
        return (
            <section className={'navigation-search' +
                (this.props.state.data.isSearchMenuOpen? ' d-block' : ' d-none d-sm-block' )}>
                <Provider store={storeSearch.store}>
                    <Search />
                </Provider>
            </section>
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
