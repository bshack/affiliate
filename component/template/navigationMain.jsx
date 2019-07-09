import React from 'react';
import _ from 'lodash';
import UtilityJSONLD from '../../utility/jsonLD';
import {connect} from 'react-redux';

const utilityJSONLD = new UtilityJSONLD();

class View extends React.PureComponent {

    closeCategoryMenu(e) {
        e.preventDefault();
        this.props.dispatch({
            type: 'UPDATE_DATA',
            data: {
                data: {
                    isMainMenuOpen: false,
                    isMainContentHidden: false,
                    categoryMenuItemOpen: false
                }
            }
        });
    }

    openCategoryMenu(e) {
        if (
            window.Modernizr.touchevents &&
            e.target.parentNode.hasAttribute('aria-expanded')
        ) {
            e.preventDefault();
            if (this.props.state.data.categoryMenuItemOpen === e.target.id) {
                this.props.state.data.categoryMenuItemOpen = false;
            } else {
                this.props.state.data.categoryMenuItemOpen = e.target.id;
            }
            this.props.dispatch({
                type: 'GET_DATA',
                data: _.extend({}, this.props.state)
            });
        }
    }

    ctaBuilder(data) {
        if (data.path === false) {
            return <button
                id={'category-link-' + data.id}
                className={this.props.state.data.isCategoryMenuOpen? 'open' : null}
                type="button"
                onClick={this.openCategoryMenu.bind(this)}
            >{data.title}</button>;
        } else {
            return <a
                id={'category-link-' + data.id}
                href={'/' + data.path + '/index.html'}
                role="menuitem"
                onClick={this.openCategoryMenu.bind(this)}
            >{data.title}</a>;
        }
    }

    recursiveBuilder(data) {
        let key;
        let links = [];
        for (key in data) {
            if (_.size(data[key].children)) {
                links.push(
                    <li
                        key={data[key].id}
                        aria-expanded={
                            (this.props.state.data.categoryMenuItemOpen &&
                            this.props.state.data.categoryMenuItemOpen ===
                                ('category-link-' + data[key].id)? true : false)
                        }
                    >
                        {this.ctaBuilder(data[key])}
                        {this.recursiveBuilder(data[key].children)}
                    </li>
                );
            } else {
                links.push(
                    <li key={data[key].id} role="none">
                        {this.ctaBuilder(data[key])}
                    </li>
                );
            }
        }
        return <ul>{links}</ul>;
    }

    render() {
        return (
            <nav
                id="navigation-main"
                className={'navigation-main' +
                    (this.props.state.data.isMainMenuOpen? ' open' : '')}
                role="menu"
                aria-labelledby="navigation-main-toggle"
            >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {this.recursiveBuilder(this.props.state.data.navigationMain)}
                            {utilityJSONLD.siteNavigationElement(this.props.state.data.navigationMain)}
                        </div>
                    </div>
                </div>
                <div className="close">
                    <button
                        type="button"
                        className="button-standard"
                        onClick={this.closeCategoryMenu.bind(this)}
                    >close menu</button>
                </div>
            </nav>
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
