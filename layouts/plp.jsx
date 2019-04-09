const React = require('react');


/* VIEWS
*************************************/

const WrapperLayout = require('./wrapper.jsx');
const NavigationMain = require('../views/navigationMain.jsx');
const Breadcrumbs = require('../views/breadcrumbs.jsx');
const CategoryProducts = require('../views/categoryProducts.jsx');


/* COMPONENT
*************************************/

class View extends React.Component {
  render() {
    return (
      <WrapperLayout
        configPublic={this.props.configPublic}
        title={this.props.category[0].title}
        discription={this.props.category[0].title}
        navigationFooter={this.props.navigationFooter}
        >
        <NavigationMain
            data={this.props.navigation}
            configPublic={this.props.configPublic} />
        <Breadcrumbs
            data={this.props.breadcrumbs}
            configPublic={this.props.configPublic} />
        <CategoryProducts
            data={this.props.products}
            configPublic={this.props.configPublic} />
      </WrapperLayout>
    );
  }
}

module.exports = View;
