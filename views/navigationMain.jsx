var React = require('react');
var _ = require('lodash');

const recursiveBuilder = (data, level) => {
    let key;
    let links = [];
    for (key in data) {
       if (_.size(data[key].children)) {
           links.push(<li key={data[key].id}><a href={'/' + data[key].path + '/index.html'}>{data[key].title}</a>{recursiveBuilder(data[key].children, (level + 1))}</li>);
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
            {recursiveBuilder(this.props.data, 1)}
        </nav>
    );
  }
}

module.exports = View;
