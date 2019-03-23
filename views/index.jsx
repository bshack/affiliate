var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var Products = require('./products.jsx');

class View extends React.Component {
  render() {
    return (
      <DefaultLayout title={this.props.products[1].title}>
        <Products data={this.props.products} />
      </DefaultLayout>
    );
  }
}

module.exports = View;
