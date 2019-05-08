import React from 'react';
import _ from 'lodash';
import UtilityJSONLD from '../../utility/jsonLD';
import {connect} from 'react-redux';

const utilityJSONLD = new UtilityJSONLD();
const ctaBuilder = (data) => {
    if (data.path === '') {
        return <button type="button" aria-expanded='false'>{data.title}</button>;
    } else {
        return <a href={'/' + data.path + '/index.html'}>{data.title}</a>;
    }
    return data;
};
const recursiveBuilder = (data) => {
    let key;
    let links = [];
    for (key in data) {
       if (_.size(data[key].children)) {
           links.push(
            <li key={data[key].id} aria-expanded='false'>
                {ctaBuilder(data[key])}
                {recursiveBuilder(data[key].children)}
            </li>
          );
       } else {
           links.push(
               <li key={data[key].id}>
                    {ctaBuilder(data[key])}
               </li>
           );
       }
    }
    return <ul>{links}</ul>;
};

class View extends React.Component {
  render() {
    return (
        <nav className="navigation-main">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                    {recursiveBuilder(this.props.data)}
                    {utilityJSONLD.siteNavigationElement(this.props.data)}
                    </div>
                </div>
            </div>
        </nav>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        data: state.data.navigationMain
    }
}

export default connect(
    mapStateToProps,
    {}
)(View);
