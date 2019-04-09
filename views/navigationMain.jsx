var React = require('react');
var _ = require('lodash');
const UtilityJSONLD = require('../utilities/jsonLD');

var utilityJSONLD = new UtilityJSONLD();

const recursiveBuilder = (data) => {
    let key;
    let links = [];
    for (key in data) {
       if (_.size(data[key].children)) {
           links.push(<li key={data[key].id}><a href={'/' + data[key].path + '/index.html'}>{data[key].title}</a>{recursiveBuilder(data[key].children)}</li>);
       } else {
           links.push(<li key={data[key].id}><a href={'/' + data[key].path + '/index.html'}>{data[key].title}</a></li>);
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
                        <ul>
                            <li>
                                <span>Deals</span>
                                {recursiveBuilder(this.props.data)}
                                {utilityJSONLD.siteNavigationElement(this.props.data)}
                            </li>
                            <li>
                                <span>Coupons</span>
                                {recursiveBuilder(this.props.data)}
                                {utilityJSONLD.siteNavigationElement(this.props.data)}
                            </li>
                            <li>
                                <span>Search</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
  }
}

module.exports = View;
