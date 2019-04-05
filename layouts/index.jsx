const React = require('react');


/* VIEWS
*************************************/

const WrapperLayout = require('./wrapper.jsx');
const NavigationMain = require('../views/navigationMain.jsx');
const Content = require('../views/content.jsx');
const CategoryProducts = require('../views/categoryProducts.jsx');


/* COMPONENT
*************************************/

class View extends React.Component {
  render() {
    return (
      <WrapperLayout
        configPublic={this.props.configPublic}
        title='home'
        >
        <NavigationMain
            data={this.props.navigation}
            configPublic={this.props.configPublic} />
        <Content
            data={this.props.content}
            configPublic={this.props.configPublic} />
        <CategoryProducts
            data={this.props.products}
            configPublic={this.props.configPublic} />
      </WrapperLayout>
    );
  }
}

module.exports = View;
