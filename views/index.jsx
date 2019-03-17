var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');

class View extends React.Component {
  render() {
    return (
      <DefaultLayout title={this.props.title}>
        <div>Hello {this.props.title}</div>
      </DefaultLayout>
    );
  }
}

module.exports = View;
