import React from 'react';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';
import SearchForm from './formSearch.jsx';
import StoreSearch from '../../store/page/search';
import config from '../../configPublic';

const storeSearch = new StoreSearch(config);

class View extends React.PureComponent {

    closeSearchMenu(e) {
        e.preventDefault();
        this.props.dispatch({
            type: 'UPDATE_DATA',
            data: {
                data: {
                    isSearchMenuOpen: false,
                    isMainContentHidden: false
                }
            }
        });
    }

    // componentDidMount() {
    //     if (this.props.state.data.isSearchMenuOpen) {
    //         console.log('focus');
    //     }
    // }

    render() {
        return (
            <section className={'navigation-search' +
                (this.props.state.data.isSearchMenuOpen? ' d-block' : ' d-none d-sm-block' )}>
                <Provider store={storeSearch.store}>
                    <SearchForm />
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
