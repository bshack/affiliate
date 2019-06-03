import React from 'react';
import {connect} from 'react-redux';
import config from '../../configPublic';
import _ from 'lodash';

class View extends React.PureComponent {

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
                        <nav className="col-12">
                            {(this.props.state.data.isMainMenuOpen?
                                <button
                                    className='menu open'
                                    type="button"
                                    onClick={this.openMainMenu.bind(this)}
                                >
                                    close main menu
                                </button>
                                :
                                <button
                                    className='menu'
                                    type="button"
                                    onClick={this.openMainMenu.bind(this)}
                                >
                                    open main menu
                                </button>
                            )}
                            <a href="/">{config.name}, click to go to hompeage</a>
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
