import React from 'react';
import {connect} from 'react-redux';
import config from '../../configPublic.json';
import Search from './search.jsx';
import StoreSearch from '../../store/page/search';
import {Provider} from 'react-redux';

const storeSearch = new StoreSearch(config);

class View extends React.Component {
    render() {
        return (
            <header>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            {this.props.config.name}
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
        config: state.data.config
    }
}

export default connect(
    mapStateToProps,
    {}
)(View);
