const React = require('react');


/* VIEWS
*************************************/

const WrapperLayout = require('./wrapper.jsx');
const NavigationMain = require('../template/navigationMain.jsx');
const Content = require('../template/content.jsx');
const CategoryProducts = require('../template/categoryProducts.jsx');
const EmailSignUp = require('../template/emailSignUp.jsx');
const EmailUnsubscribe = require('../template/emailUnsubscribe.jsx');


/* COMPONENT
*************************************/

class View extends React.Component {
  render() {
    return (
      <WrapperLayout
        configPublic={this.props.configPublic.store.getState()}
        title={this.props.content.store.getState()[0].metatitle}
        description={this.props.content.store.getState()[0].metadescription}
        image={this.props.configPublic.store.getState().www.origin + this.props.configPublic.store.getState().social.image}
        canonical={this.props.configPublic.store.getState().www.origin}
        navigationFooter={this.props.navigationFooter.store.getState()}
        >
        <NavigationMain
            data={this.props.navigationMain.store.getState()}
            configPublic={this.props.configPublic.store.getState()} />
        <Content
            data={this.props.content.store.getState()}
            configPublic={this.props.configPublic.store.getState()} />
        <CategoryProducts
            title='Featured Deals'
            data={this.props.productsFeatured.store.getState()}
            configPublic={this.props.configPublic.store.getState()} />
        <EmailSignUp
            configPublic={this.props.configPublic.store.getState()} />
        <CategoryProducts
            title='You Also May Like'
            data={this.props.products.store.getState()}
            configPublic={this.props.configPublic.store.getState()} />
      </WrapperLayout>
    );
  }
}

module.exports = View;
