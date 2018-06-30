var React = require('react');
var DefaultLayout = require('../layouts/default');

class View extends React.Component {
  render() {
    return (
      <DefaultLayout title={this.props.name}>
        <div>Hello {this.props.name}</div>
      </DefaultLayout>
    );
  }
}

module.exports = View;
