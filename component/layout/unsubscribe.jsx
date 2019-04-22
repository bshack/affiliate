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
        configPublic={this.props.configPublic}
        title="Unsubscribe"
        description="Unsubscribe from email marketing."
        image={this.props.configPublic.www.origin + this.props.configPublic.social.image}
        canonical={this.props.configPublic.www.origin}
        navigationFooter={this.props.navigationFooter}
        >
        <NavigationMain
            data={this.props.navigationMain}
            configPublic={this.props.configPublic} />
        <EmailUnsubscribe
            configPublic={this.props.configPublic} />
        <CategoryProducts
            title='You Also May Like'
            data={this.props.products}
            configPublic={this.props.configPublic} />
      </WrapperLayout>
    );
  }
}

module.exports = View;
