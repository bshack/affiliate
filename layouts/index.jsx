const React = require('react');
const WrapperLayout = require('./wrapper.jsx');
const CategoryProducts = require('../views/category.jsx');
const NavigationMain = require('../views/navigationMain.jsx');
const Content = require('../views/content.jsx');

class View extends React.Component {
  render() {
    return (
      <WrapperLayout title='home'>
        <NavigationMain data={this.props.navigation} />
        <Content data={this.props.content} />
        <CategoryProducts data={this.props.products} />
      </WrapperLayout>
    );
  }
}

module.exports = View;
