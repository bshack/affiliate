var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var CategoryProducts = require('./categoryProducts.jsx');

class View extends React.Component {
  render() {
    return (
      <DefaultLayout title='yo'>
        <CategoryProducts data={this.props.products} />
      </DefaultLayout>
    );
  }
}

module.exports = View;
