const React = require('react');
const WrapperLayout = require('./wrapper.jsx');
const CategoryProducts = require('../views/category.jsx');
const NavigationMain = require('../views/navigationMain.jsx');
const Breadcrumbs = require('../views/breadcrumbs.jsx');

class View extends React.Component {
  render() {
    return (
      <WrapperLayout
        title={this.props.products[0].title}
        discription=""
        >
        <NavigationMain data={this.props.navigation} />
        <Breadcrumbs data={this.props.breadcrumbs} />
        <CategoryProducts data={this.props.products} />
        <CategoryProducts data={this.props.productRecommendations} />
      </WrapperLayout>
    );
  }
}

module.exports = View;
