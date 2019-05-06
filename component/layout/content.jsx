const React = require('react');


/* VIEWS
*************************************/

const WrapperLayout = require('./wrapper.jsx');
const NavigationMain = require('../template/navigationMain.jsx');
const Breadcrumbs = require('../template/breadcrumbs.jsx');
const CategoryProducts = require('../template/categoryProducts.jsx');
const Content = require('../template/content.jsx');
const EmailSignUp = require('../template/emailSignUp.jsx');


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
          canonical={this.props.configPublic.store.getState().www.origin + '/' + this.props.content.store.getState()[0].filename + '.html'}
          navigationFooter={this.props.navigationFooter.store.getState()}
        >
        <NavigationMain
            data={this.props.navigationMain.store.getState()}
            configPublic={this.props.configPublic.store.getState()} />
        <Breadcrumbs
            data={this.props.breadcrumbs.store.getState()}
            configPublic={this.props.configPublic.store.getState()} />
        <Content
            data={this.props.content.store.getState()}
            configPublic={this.props.configPublic.store.getState()} />
        <EmailSignUp
            configPublic={this.props.configPublic.store.getState()} />
        <CategoryProducts
            subtitle='You Also May Like'
            data={this.props.products.store.getState()}
            configPublic={this.props.configPublic.store.getState()} />
      </WrapperLayout>
    );
  }
}

module.exports = View;
