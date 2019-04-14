const React = require('react');


/* VIEWS
*************************************/

const WrapperLayout = require('./wrapper.jsx');
const NavigationMain = require('../views/navigationMain.jsx');
const Breadcrumbs = require('../views/breadcrumbs.jsx');
const ProductDetail = require('../views/productDetail.jsx');
const CategoryProducts = require('../views/categoryProducts.jsx');
const EmailSignUp = require('../views/emailSignUp.jsx');


/* COMPONENT
*************************************/

class View extends React.Component {
  render() {
    return (
      <WrapperLayout
        configPublic={this.props.configPublic}
        title={this.props.products[0].title}
        description={this.props.products[0].description}
        canonical={this.props.configPublic.www.origin + '/' + this.props.products[0].path + '/' + this.props.products[0].seoFilenamePart + '.html'}
        navigationFooter={this.props.navigationFooter}
        >
        <NavigationMain
            data={this.props.navigationMain}
            configPublic={this.props.configPublic} />
        <Breadcrumbs
            data={this.props.breadcrumbs}
            configPublic={this.props.configPublic} />
        <ProductDetail
            data={this.props.products[0]}
            configPublic={this.props.configPublic} />
        <CategoryProducts
            subtitle='You Also May Like'
            data={this.props.productRecommendations}
            configPublic={this.props.configPublic} />
        <EmailSignUp
            configPublic={this.props.configPublic} />
      </WrapperLayout>
    );
  }
}

module.exports = View;
