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
        <nav className="main">
            {recursiveBuilder(this.props.data)}
            {utilityJSONLD.siteNavigationElement(this.props.data)}
        </nav>
    );
  }
}

module.exports = View;
