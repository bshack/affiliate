const React = require('react');
const DefaultLayout = require('../layouts/default.jsx');
const CategoryProducts = require('./categoryProducts.jsx');
const NavigationMain = require('./navigationMain.jsx');

class View extends React.Component {
  render() {
    return (
      <DefaultLayout title='yo'>
        <NavigationMain data={this.props.navigation} />
        <CategoryProducts data={this.props.products} />
      </DefaultLayout>
    );
  }
}

module.exports = View;
