const React = require('react');


/* VIEWS
*************************************/

const WrapperLayout = require('./wrapper.jsx');
const NavigationMain = require('../template/navigationMain.jsx');
const Breadcrumbs = require('../template/breadcrumbs.jsx');
const ProductDetail = require('../template/productDetail.jsx');
const CategoryProducts = require('../template/categoryProducts.jsx');
const EmailSignUp = require('../template/emailSignUp.jsx');


/* COMPONENT
*************************************/

class View extends React.Component {
  render() {
    return (
      <WrapperLayout
        configPublic={this.props.configPublic.store.getState()}
        title={this.props.products.store.getState()[0].title}
        description={this.props.products.store.getState()[0].description}
        image={this.props.configPublic.store.getState().cdn.origin + '/' + this.props.products.store.getState()[0].path + '/' + this.props.products.store.getState()[0].seoFilenamePart + '-social.jpg'}
        canonical={this.props.configPublic.store.getState().www.origin + '/' + this.props.products.store.getState()[0].path + '/' + this.props.products.store.getState()[0].seoFilenamePart + '.html'}
        navigationFooter={this.props.navigationFooter.store.getState()}
        >
        <NavigationMain
            data={this.props.navigationMain.store.getState()}
            configPublic={this.props.configPublic.store.getState()} />
        <Breadcrumbs
            data={this.props.breadcrumbs.store.getState()}
            configPublic={this.props.configPublic.store.getState()} />
        <ProductDetail
            data={this.props.products.store.getState()[0]}
            configPublic={this.props.configPublic.store.getState()} />
        <CategoryProducts
            subtitle='You Also May Like'
            data={this.props.productRecommendations.store.getState()}
            configPublic={this.props.configPublic.store.getState()} />
        <EmailSignUp
            configPublic={this.props.configPublic.store.getState()} />
      </WrapperLayout>
    );
  }
}

module.exports = View;
