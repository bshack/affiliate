const React = require('react');
const WrapperLayout = require('./wrapper.jsx');
const CategoryProducts = require('../views/category.jsx');
const NavigationMain = require('../views/navigationMain.jsx');
const Breadcrumbs = require('../views/breadcrumbs.jsx');



class View extends React.Component {
  render() {
    return (
      <WrapperLayout
          title={this.props.category[0].title}
          discription={this.props.category[0].title}
      >
        <NavigationMain data={this.props.navigation} />
        <Breadcrumbs data={this.props.breadcrumbs} />
        <CategoryProducts data={this.props.products} />
      </WrapperLayout>
    );
  }
}

module.exports = View;
