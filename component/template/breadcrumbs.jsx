import React from 'react';
import _ from 'lodash';
import UtilityJSONLD from '../../utility/jsonLD';
import {connect} from 'react-redux';

const utilityJSONLD = new UtilityJSONLD();

const recursiveBuilder = (data) => {
    let dataSize = _.size(data);
    let count = 1;
    let key;
    let links = [];
    for (key in data) {
        if (dataSize === count) {
            links.push(<li key={data[key].id || 1}>{data[key].title}</li>);
        } else if (data[key].id === 'home') {
            links.push(
                <li key={data[key].id || 1}><a href={'/'}>
                    {data[key].title}</a>
                </li>
            );
        } else {
            links.push(
                <li key={data[key].id || 1}>
                    <a href={'/' + data[key].path + '/index.html'}>{data[key].title}</a>
                </li>
            );
        }
        count = (count + 1);
    }
    return <ul>{links}</ul>;
};

class View extends React.PureComponent {
    render() {
        return (
            <nav className="container breadcrumbs">
                <div className="row">
                    <div className="col-12">
                        {recursiveBuilder(this.props.data)}
                        {utilityJSONLD.breadcrumbs(this.props.data)}
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data.breadcrumb,
        config: state.data.config
    }
}

export default connect(
    mapStateToProps
)(View);
