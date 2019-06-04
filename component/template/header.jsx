import React from 'react';
import {connect} from 'react-redux';
import config from '../../configPublic';
import _ from 'lodash';

class View extends React.PureComponent {

    componentDidMount() {
        if (typeof Image === 'function') {
            new Image().src = config.www.origin + '/' + config.static.version + '/image/close.svg';
        }
    }

    openMainMenu(e) {
        e.preventDefault();
        let menuState = {
            data: {
                isSearchMenuOpen: false
            }
        };
        if (this.props.state.data.isMainMenuOpen) {
            menuState.data.isMainMenuOpen = false;
        } else {
            menuState.data.isMainMenuOpen = true;
        }
        this.props.dispatch({
            type: 'UPDATE_DATA',
            data: menuState
        });
    }

    openSearchMenu(e) {
        e.preventDefault();
        if (this.props.state.data.isSearchMenuOpen) {
            this.props.state.data.isSearchMenuOpen = false;
        } else {
            this.props.state.data.isSearchMenuOpen = true;
            this.props.state.data.isMainMenuOpen = false;
        }
        this.props.dispatch({
            type: 'UPDATE_DATA',
            data: _.extend({}, this.props.state)
        });
    }

    render() {
        return (
            <header>
                <div className="container">
                    <div className="row">
                        <nav className="col-12" aria-label="toolbar">
                            {(this.props.state.data.isMainMenuOpen?
                                <button
                                    id="navigation-main-toggle"
                                    aria-expanded="true"
                                    aria-haspopup="true"
                                    aria-controls="navigation-main"
                                    className="menu open"
                                    type="button"
                                    onClick={this.openMainMenu.bind(this)}
                                >
                                    main menu
                                </button>
                                :
                                <button
                                    id="navigation-main-toggle"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                    aria-controls="navigation-main"
                                    className="menu"
                                    type="button"
                                    onClick={this.openMainMenu.bind(this)}
                                >
                                    main menu
                                </button>
                            )}
                            <a href="/">{config.name}</a>
                            {(this.props.state.data.isSearchMenuOpen?
                                <button
                                    className='search open'
                                    type="button"
                                    onClick={this.openSearchMenu.bind(this)}
                                >
                                    close search menu
                                </button>
                                :
                                <button
                                    className='search'
                                    type="button"
                                    onClick={this.openSearchMenu.bind(this)}
                                >
                                    open search menu
                                </button>
                            )}
                        </nav>
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
