const React = require('react');


/* VIEWS
*************************************/

const WrapperLayout = require('./wrapper.jsx');
const NavigationMain = require('../template/navigationMain.jsx');
const CategoryProducts = require('../template/categoryProducts.jsx');
const EmailUnsubscribe = require('../template/emailUnsubscribe.jsx');

/* COMPONENT
*************************************/

class View extends React.Component {
  render() {
    return (
      <WrapperLayout
        configPublic={this.props.configPublic.store.getState()}
        title="Unsubscribe"
        description="Unsubscribe from email marketing."
        image={this.props.configPublic.store.getState().www.origin + this.props.configPublic.store.getState().social.image}
        canonical={this.props.configPublic.store.getState().www.origin}
        navigationFooter={this.props.navigationFooter.store.getState()}
        >
        <NavigationMain
            data={this.props.navigationMain.store.getState()}
            configPublic={this.props.configPublic.store.getState()} />
        <EmailUnsubscribe
            data={this.props.emailUnsubscribe}
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
