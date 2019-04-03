const React = require('react');
const DefaultLayout = require('../layouts/default.jsx');
const CategoryProducts = require('./categoryProducts.jsx');
const NavigationMain = require('./navigationMain.jsx');
const Breadcrumbs = require('./breadcrumbs.jsx');

class View extends React.Component {
  render() {
    return (
      <DefaultLayout title={this.props.products[0].title}>
        <NavigationMain data={this.props.navigation} />
        <Breadcrumbs data={this.props.breadcrumbs} />
        <CategoryProducts data={this.props.products} />
        <CategoryProducts data={this.props.productRecommendations} />
      </DefaultLayout>
    );
  }
}

module.exports = View;
