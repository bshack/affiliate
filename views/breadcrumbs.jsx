var React = require('react');
var _ = require('lodash');
const UtilityJSONLD = require('../utilities/jsonLD');

var utilityJSONLD = new UtilityJSONLD();

const recursiveBuilder = (data) => {
    let dataSize = _.size(data);
    let count = 1;
    let key;
    let links = [];
    for (key in data) {
        if (dataSize === count) {
            links.push(<li key={data[key].id}>{data[key].title}</li>);
        } else if (data[key].id === 'home') {
            links.push(<li key={data[key].id}><a href={'/'}>{data[key].title}</a></li>);
        } else {
            links.push(<li key={data[key].id}><a href={'/' + data[key].path + '/index.html'}>{data[key].title}</a></li>);
        }
        count = (count + 1);
    }
    return <ul>{links}</ul>;
};

class View extends React.Component {
  render() {
    return (
        <nav>
            {recursiveBuilder(this.props.data)}
            {utilityJSONLD.breadcrumbs(this.props.data)}
        </nav>
    );
  }
}

module.exports = View;
