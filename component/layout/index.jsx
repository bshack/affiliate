const React = require('react');


/* VIEWS
*************************************/

const WrapperLayout = require('./wrapper.jsx');
const NavigationMain = require('../navigationMain.jsx');
const Content = require('../content.jsx');
const CategoryProducts = require('../categoryProducts.jsx');
const EmailSignUp = require('../emailSignUp.jsx');


/* COMPONENT
*************************************/

class View extends React.Component {
  render() {
    return (
      <WrapperLayout
        configPublic={this.props.configPublic}
        title={this.props.content[0].metatitle}
        description={this.props.content[0].metadescription}
        image={this.props.configPublic.www.origin + this.props.configPublic.social.image}
        canonical={this.props.configPublic.www.origin}
        navigationFooter={this.props.navigationFooter}
        >
        <NavigationMain
            data={this.props.navigationMain}
            configPublic={this.props.configPublic} />
        <Content
            data={this.props.content}
            configPublic={this.props.configPublic} />
        <CategoryProducts
            title='Featured Deals'
            data={this.props.productsFeatured}
            configPublic={this.props.configPublic} />
        <EmailSignUp
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
