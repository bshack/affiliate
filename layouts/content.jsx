const React = require('react');
const WrapperLayout = require('./wrapper.jsx');
const CategoryProducts = require('../views/category.jsx');
const NavigationMain = require('../views/navigationMain.jsx');
const Breadcrumbs = require('../views/breadcrumbs.jsx');
const Content = require('../views/content.jsx');

class View extends React.Component {
  render() {
    return (
      <WrapperLayout
        title={this.props.content[0].metatitle}
        discription={this.props.content[0].metadescription}
        >
        <NavigationMain data={this.props.navigation} />
        <Breadcrumbs data={this.props.breadcrumbs} />
        <Content data={this.props.content} />
        <CategoryProducts data={this.props.products} />
      </WrapperLayout>
    );
  }
}

module.exports = View;
