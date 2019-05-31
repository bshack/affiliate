import React from 'react';
import _ from 'lodash';
import UtilityJSONLD from '../../utility/jsonLD';
import {connect} from 'react-redux';

const utilityJSONLD = new UtilityJSONLD();

class View extends React.PureComponent {

    openCategoryMenu(e) {
        e.preventDefault();
        if (this.props.state.data.isCategoryMenuOpen) {
            this.props.state.data.isCategoryMenuOpen = false;
        } else {
            this.props.state.data.isCategoryMenuOpen = true;
        }
        this.props.dispatch({
            type: 'GET_DATA',
            data: _.extend({}, this.props.state)
        });
    }

    ctaBuilder(data) {
        if (data.path === '') {
            return <button
                className={this.props.state.data.isCategoryMenuOpen? 'open' : null}
                type="button"
                aria-expanded='false'
                onClick={this.openCategoryMenu.bind(this)}
            >{data.title}</button>;
        } else {
            return <a href={'/' + data.path + '/index.html'}>{data.title}</a>;
        }
    }

    recursiveBuilder(data) {
        let key;
        let links = [];
        for (key in data) {
            if (_.size(data[key].children)) {
                links.push(
                    <li key={data[key].id} aria-expanded='false'>
                        {this.ctaBuilder(data[key])}
                        {this.recursiveBuilder(data[key].children)}
                    </li>
                );
            } else {
                links.push(
                    <li key={data[key].id}>
                        {this.ctaBuilder(data[key])}
                    </li>
                );
            }
        }
        return <ul>{links}</ul>;
    }

    render() {
        return (
            <nav className="navigation-main">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {this.recursiveBuilder(this.props.state.data.navigationMain)}
                            {utilityJSONLD.siteNavigationElement(this.props.state.data.navigationMain)}
                        </div>
                    </div>
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
